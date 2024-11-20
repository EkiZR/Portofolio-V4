#!/bin/bash

# Pastikan script dijalankan sebagai root
if [ "$(id -u)" != "0" ]; then
    echo "Script harus dijalankan dengan sudo"
    exit 1
fi

# Minta input dari pengguna di awal
while true; do
    read -p "Masukkan IP address (contoh: 192.168.1.1): " user_ip
    if [[ $user_ip =~ ^[0-9]+\.[0-9]+\.[0-9]+\.[0-9]+$ ]]; then
        break
    else
        echo "IP Address tidak valid. Gunakan format seperti 192.168.1.1"
    fi
done

while true; do
    read -p "Masukkan nama domain (contoh: smkeki.sch.id): " user_domain
    if [[ $user_domain =~ ^[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$ ]]; then
        break
    else
        echo "Format domain tidak valid. Gunakan format seperti smkeki.sch.id"
    fi
done

# Tambah repository universe
add-apt-repository universe -y

# Update dan install paket penting
apt-get update
apt-get install -y \
    bind9 \
    apache2 \
    mysql-server \
    phpmyadmin \
    apache2-utils

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
echo "Include /etc/phpmyadmin/apache.conf" >> /etc/apache2/apache2.conf

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
