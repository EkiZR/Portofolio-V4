#!/bin/bash

# Pastikan script dijalankan sebagai root
if [ "$(id -u)" != "0" ]; then
   echo "Script harus dijalankan dengan sudo" 
   exit 1
fi

# Tambah repository universe
add-apt-repository universe -y

# Fungsi validasi input
validate_input() {
    local input="$1"
    local type="$2"

    case "$type" in
        "ip")
            if [[ $input =~ ^([0-9]{1,3}\.){3}[0-9]{1,3}$ ]]; then
                # Validasi setiap oktet berada dalam rentang 0-255
                IFS='.' read -r -a octets <<< "$input"
                for octet in "${octets[@]}"; do
                    if ((octet < 0 || octet > 255)); then
                        echo "IP Address tidak valid. Setiap oktet harus antara 0-255"
                        return 1
                    fi
                done
                return 0
            else
                echo "IP Address tidak valid. Gunakan format seperti 192.168.1.1"
                return 1
            fi
            ;;
        "domain")
            if ! [[ $input =~ ^[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$ ]]; then
                echo "Format domain tidak valid. Gunakan format seperti smkeki.sch.id"
                return 1
            fi
            ;;
        "password")
            if [[ ${#input} -lt 8 ]]; then
                echo "Password minimal 8 karakter"
                return 1
            fi
            ;;
    esac
    return 0
}

# Update dan install paket yang dibutuhkan
apt-get update
apt-get install -y \
    bind9 \
    apache2-utils \
    software-properties-common \
    debconf-utils

# Minta input dari pengguna
while true; do
    read -p "Masukkan IP address (contoh: 192.168.1.1): " user_ip
    validate_input "$user_ip" "ip" && break
done

while true; do
    read -p "Masukkan nama domain (contoh: smkeki.sch.id): " user_domain
    validate_input "$user_domain" "domain" && break
done

# Minta input password dari pengguna
while true; do
    read -sp "Masukkan password MySQL/phpMyAdmin (minimal 8 karakter): " mysql_password
    echo
    validate_input "$mysql_password" "password" && break
done

# Noninteractive config untuk MySQL dan phpMyAdmin
echo "mysql-server mysql-server/root_password password $mysql_password" | debconf-set-selections
echo "mysql-server mysql-server/root_password_again password $mysql_password" | debconf-set-selections
echo "phpmyadmin phpmyadmin/reconfigure-webserver select apache2" | debconf-set-selections
echo "phpmyadmin phpmyadmin/dbconfig-install boolean true" | debconf-set-selections
echo "phpmyadmin phpmyadmin/mysql/app-pass password $mysql_password" | debconf-set-selections
echo "phpmyadmin phpmyadmin/app-password-confirm password $mysql_password" | debconf-set-selections

# Install paket dengan mode noninteraktif
DEBIAN_FRONTEND=noninteractive apt-get install -y apache2 mysql-server phpmyadmin

# Optimasi repository
sed -i 's|archive.ubuntu.com|mirror.its.ac.id|g' /etc/apt/sources.list
cat > /etc/apt/apt.conf.d/99optimize <<EOL
Acquire::ForceHash "true";
Acquire::CompressionTypes::Order:: "gz";
APT::Get::Assume-Yes "true";
APT::Install-Recommends "false";
APT::Install-Suggests "false";
EOL

# Nonaktifkan update otomatis
systemctl stop apt-daily.timer
systemctl disable apt-daily.timer
systemctl stop apt-daily-upgrade.timer
systemctl disable apt-daily-upgrade.timer

# Konfigurasi DNS
mkdir -p /etc/bind
cat > /etc/resolv.conf <<EOL
nameserver $user_ip
nameserver 8.8.8.8
search $user_domain
options edns0 trust-ad
EOL

# Konfigurasi zona Bind9
reversed_ip=$(echo "$user_ip" | awk -F. '{print $3"."$2"."$1}')

cat > /etc/bind/named.conf.default-zones <<EOL
zone "$user_domain" { 
    type master; 
    file "/etc/bind/smk.db"; 
};

zone "$reversed_ip.in-addr.arpa" { 
    type master; 
    file "/etc/bind/smk.ip"; 
};
EOL

# Konfigurasi file zona
cat > /etc/bind/smk.db <<EOL
\$TTL    604800
@       IN      SOA     ns.$user_domain. root.$user_domain. (
                        2         ; Serial
                        604800    ; Refresh
                        86400     ; Retry
                        2419200   ; Expire
                        604800 )  ; Negative Cache TTL
;
@       IN      NS      ns.$user_domain.
@       IN      MX 10   $user_domain
@       IN      A       $user_ip
ns      IN      A       $user_ip
www     IN      CNAME   ns
mail    IN      CNAME   ns
ftp     IN      CNAME   ns
ntp     IN      CNAME   ns
proxy   IN      CNAME   ns
EOL

# Konfigurasi file PTR
octet=$(echo "$user_ip" | awk -F. '{print $4}')
cat > /etc/bind/smk.ip <<EOL
@       IN      SOA     ns.$user_domain. root.$user_domain. (
                        2         ; Serial
                        604800    ; Refresh
                        86400     ; Retry
                        2419200   ; Expire
                        604800 )  ; Negative Cache TTL
;
@       IN      NS      ns.$user_domain.
$octet  IN      PTR     ns.$user_domain.
EOL

# Konfigurasi Apache
mkdir -p /etc/apache2/sites-available
mkdir -p /var/www

cat > /etc/apache2/sites-available/000-default.conf <<EOL
<VirtualHost $user_ip:80>
        ServerAdmin admin@$user_domain
        ServerName www.$user_domain
        DocumentRoot /var/www
        ErrorLog \${APACHE_LOG_DIR}/error.log
        LogLevel warn
        CustomLog \${APACHE_LOG_DIR}/access.log combined
</VirtualHost>
EOL

# Buat index.php
cat > /var/www/index.php <<EOL
<!DOCTYPE html>
<html>
<body>
    <h1>Selamat Datang di Server $user_domain</h1>
    <?php phpinfo(); ?>
</body>
</html>
EOL

echo "Menambahkan konfigurasi phpMyAdmin ke apache2.conf..."
echo "Include /etc/phpmyadmin/apache.conf" | sudo tee -a /etc/apache2/apache2.conf

# Aktifkan modul Apache
a2ensite 000-default.conf
a2enmod rewrite
a2enmod ssl

# Restart layanan
systemctl restart bind9 || true
systemctl restart apache2 || true

echo "==== Konfigurasi Selesai ===="
echo "Domain: $user_domain"
echo "IP: $user_ip"
echo "Password MySQL/phpMyAdmin telah diatur"