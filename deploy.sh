#!/bin/bash

set -e

DOMAIN="ibrahimi.software"
CERT_DIR="/etc/ssl/$DOMAIN"

echo "### Updating and installing Docker and Nginx..."
sudo apt update
sudo apt install -y docker.io nginx

echo "### Starting and enabling Docker service..."
sudo systemctl start docker
sudo systemctl enable docker

echo "### Pulling and running your Docker container..."
sudo docker pull ibrahimimohamed2108/nextgen-portfolio:v1.1
sudo docker stop nextgen-portfolio || true
sudo docker rm nextgen-portfolio || true
sudo docker run -d --name nextgen-portfolio -p 3000:80 ibrahimimohamed2108/nextgen-portfolio:v1.1

echo "### Setting up SSL directory and copying certs..."
sudo mkdir -p "$CERT_DIR"
sudo cp ~/certificate.crt "$CERT_DIR/fullchain.crt"
sudo cp ~/ca_bundle.crt "$CERT_DIR/ca_bundle.crt"
sudo cp ~/private.key "$CERT_DIR/private.key"
sudo chmod 600 "$CERT_DIR/private.key"

echo "### Creating Nginx config for HTTPS reverse proxy..."
NGINX_CONF="/etc/nginx/sites-available/default"

sudo tee $NGINX_CONF > /dev/null <<EOF
server {
    listen 80;
    server_name $DOMAIN www.$DOMAIN;

    return 301 https://\$host\$request_uri;
}

server {
    listen 443 ssl;
    server_name $DOMAIN www.$DOMAIN;

    ssl_certificate $CERT_DIR/fullchain.crt;
    ssl_certificate_key $CERT_DIR/private.key;
    ssl_trusted_certificate $CERT_DIR/ca_bundle.crt;

    ssl_protocols TLSv1.2 TLSv1.3;
    ssl_ciphers HIGH:!aNULL:!MD5;

    location / {
        proxy_pass http://localhost:3000;
        proxy_set_header Host \$host;
        proxy_set_header X-Real-IP \$remote_addr;
        proxy_set_header X-Forwarded-For \$proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto \$scheme;
    }
}
EOF

echo "### Testing Nginx config..."
sudo nginx -t

echo "### Restarting Nginx..."
sudo systemctl restart nginx

echo "### Deployment finished. Your site should be live at https://$DOMAIN"
