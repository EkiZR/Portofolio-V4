#!/bin/bash

# Pastikan script dijalankan sebagai root
if [ "$(id -u)" != "0" ]; then
    echo "Script harus dijalankan dengan sudo"
    exit 1
fi

# Fungsi untuk membaca input dengan timeout
get_input() {
    local prompt="$1"
    local default="$2"
    local input

    # Gunakan /dev/tty untuk memastikan input bisa dibaca meski melalui pipe
    exec < /dev/tty
    read -p "$prompt" input

    if [ -z "$input" ] && [ ! -z "$default" ]; then
        echo "$default"
    else
        echo "$input"
    fi
}

# Periksa koneksi internet
check_internet() {
    echo "Memeriksa koneksi internet..."
    if ! ping -c 4 8.8.8.8 &>/dev/null; then
        echo "Tidak ada koneksi internet. Periksa jaringan Anda dan coba lagi."
        exit 1
    fi
    echo "Koneksi internet OK."
}

# Perbaiki konfigurasi DNS
fix_dns() {
    echo "Memperbaiki konfigurasi DNS..."
    echo -e "nameserver 8.8.8.8\nnameserver 8.8.4.4" > /etc/resolv.conf
    echo "Konfigurasi DNS telah diperbaiki."
}

# Pastikan koneksi internet dan DNS sudah benar
check_internet
fix_dns

# Minta input IP dan domain
user_ip=$(get_input "Masukkan IP address (contoh: 192.168.1.1): ")
user_domain=$(get_input "Masukkan nama domain (contoh: smkeki.sch.id): ")

# Minta input untuk password MySQL dan phpMyAdmin
mysql_root_password=$(get_input "Masukkan password untuk root MySQL: ")
phpmyadmin_password=$(get_input "Masukkan password untuk phpMyAdmin: ")

# Validasi input
if [ -z "$user_ip" ] || [ -z "$user_domain" ] || [ -z "$mysql_root_password" ] || [ -z "$phpmyadmin_password" ]; then
    echo "IP address, domain, MySQL password, dan phpMyAdmin password tidak boleh kosong. Jalankan ulang script."
    exit 1
fi

# Tambah repository universe
add-apt-repository universe -y

# Update dan install paket penting
export DEBIAN_FRONTEND=noninteractive

# Set konfigurasi otomatis untuk MySQL dan phpMyAdmin
echo "mysql-server mysql-server/root_password password $mysql_root_password" | debconf-set-selections
echo "mysql-server mysql-server/root_password_again password $mysql_root_password" | debconf-set-selections
echo "phpmyadmin phpmyadmin/dbconfig-install boolean true" | debconf-set-selections
echo "phpmyadmin phpmyadmin/mysql/admin-pass password $mysql_root_password" | debconf-set-selections
echo "phpmyadmin phpmyadmin/mysql/app-pass password $phpmyadmin_password" | debconf-set-selections
echo "phpmyadmin phpmyadmin/reconfigure-webserver multiselect apache2" | debconf-set-selections

apt-get update
apt-get install -y \
    bind9 \
    apache2 \
    mysql-server \
    apache2-utils \
    phpmyadmin

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

echo "zone \"$user_domain\" {
     type master;
     file \"/etc/bind/smk.db\";
 }" >> /etc/bind/named.conf.default-zones

echo "zone \"$reversed_ip.in-addr.arpa\" {
     type master;
     file \"/etc/bind/smk.ip\";
 }" >> /etc/bind/named.conf.default-zones

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
@       IN      MX 10   $user_domain.
@       IN      A       $user_ip
ns      IN      A       $user_ip
www     IN      CNAME   ns
mail    IN      CNAME   ns
ftp     IN      CNAME   ns
ntp     IN      CNAME   ns
proxy   IN      CNAME   ns
EOL

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
mkdir -p /etc/apache2/sites-available /var/www
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

cat > /var/www/index.php <<EOL
<!DOCTYPE html>
<html>
<body>
    <h1>Selamat Datang di Server $user_domain</h1>
    <?php phpinfo(); ?>
</body>
</html>
EOL

echo "Include /etc/phpmyadmin/apache.conf" >> /etc/apache2/apache2.conf
a2ensite 000-default.conf
a2enmod rewrite ssl

systemctl restart bind9 apache2

# Instalasi Samba
apt-get install -y samba smbclient

# Konfigurasi Samba
mkdir -p /var/www
chmod -R 0777 /var/www

samba_user=$(get_input "Masukkan username Samba (contoh: tamu): ")
useradd -m "$samba_user"
smbpasswd -a "$samba_user"

cat >> /etc/samba/smb.conf <<EOL

[www]
   path = /var/www
   browsable = yes
   writable = yes
   guest ok = yes
   read only = no
   create mask = 0777
   directory mask = 0777
EOL

systemctl restart smbd 

echo "==== Konfigurasi Selesai ===="
echo "Domain: $user_domain"
echo "Samba share tersedia di /var/www. Gunakan $samba_user untuk mengakses."
