---

# Deployment Guide for NextGen Portfolio Website on EC2 with Docker and TLS

## Overview

This guide explains how to deploy your NextGen Portfolio website on an Ubuntu EC2 instance using Docker and Nginx as a reverse proxy with TLS (HTTPS) support. It covers the entire workflow, from domain setup to a working secure website.

---

## Prerequisites

* An Ubuntu EC2 instance with SSH access (e.g., `ubuntu@ec2-ip-address`)
* Domain name (e.g., `ibrahimi.software`) managed on Name.com or another registrar
* TLS certificate files issued by Sectigo (or any trusted CA):

  * `certificate.crt` (your domain certificate)
  * `ca_bundle.crt` (intermediate CA bundle)
  * `private.key` (your private key corresponding to the CSR)
* Docker image pushed to DockerHub: `ibrahimimohamed2108/nextgen-portfolio:v1.1`

---

## Step 1 — Domain and Certificate Setup

1. **Generate a CSR and private key** on your local machine or server:

   ```bash
   openssl req -newkey rsa:2048 -nodes -keyout private.key -out request.csr -subj "/CN=ibrahimi.software"
   ```

2. **Submit the CSR** to Name.com or your chosen CA (Sectigo in your case).

3. **Download issued certificates** from the CA, which typically include:

   * Your domain certificate (`certificate.crt`)
   * Intermediate CA bundle (`ca_bundle.crt`)
   * Root CA certificate (optional, often included in bundle)

4. **Upload** the following files to your EC2 instance home directory `/home/ubuntu`:

   * `certificate.crt`
   * `ca_bundle.crt`
   * `private.key`

---

## Step 2 — Install Docker and Nginx

SSH into your EC2 instance and run:

```bash
sudo apt update
sudo apt install -y docker.io nginx
sudo systemctl start docker
sudo systemctl enable docker
sudo systemctl start nginx
sudo systemctl enable nginx
```

---

## Step 3 — Run Your Docker Container

Stop any running containers and run your portfolio container:

```bash
sudo docker stop nextgen-portfolio || true
sudo docker rm nextgen-portfolio || true
sudo docker pull ibrahimimohamed2108/nextgen-portfolio:v1.1
sudo docker run -d --name nextgen-portfolio -p 3000:80 ibrahimimohamed2108/nextgen-portfolio:v1.1
```

---

## Step 4 — Setup SSL Certificates on Server

Create a directory to store certificates and copy your files:

```bash
sudo mkdir -p /etc/ssl/ibrahimi.software
sudo cp ~/certificate.crt /etc/ssl/ibrahimi.software/fullchain.crt
sudo cp ~/ca_bundle.crt /etc/ssl/ibrahimi.software/ca_bundle.crt
sudo cp ~/private.key /etc/ssl/ibrahimi.software/private.key
```

Make sure permissions are secure:

```bash
sudo chmod 600 /etc/ssl/ibrahimi.software/private.key
```

---

## Step 5 — Configure Nginx

Edit the Nginx default site configuration:

```bash
sudo nano /etc/nginx/sites-available/default
```

Replace contents with:

```nginx
server {
    listen 80;
    server_name ibrahimi.software www.ibrahimi.software;

    # Redirect all HTTP to HTTPS
    return 301 https://$host$request_uri;
}

server {
    listen 443 ssl;
    server_name ibrahimi.software www.ibrahimi.software;

    ssl_certificate /etc/ssl/ibrahimi.software/fullchain.crt;
    ssl_certificate_key /etc/ssl/ibrahimi.software/private.key;
    ssl_trusted_certificate /etc/ssl/ibrahimi.software/ca_bundle.crt;

    ssl_protocols TLSv1.2 TLSv1.3;
    ssl_ciphers HIGH:!aNULL:!MD5;

    location / {
        proxy_pass http://localhost:3000;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}
```

---

## Step 6 — Test and Restart Nginx

Test the Nginx configuration:

```bash
sudo nginx -t
```

If OK, restart Nginx:

```bash
sudo systemctl restart nginx
```

---

## Step 7 — Access Your Website

Open your browser and navigate to:

```
https://ibrahimi.software
```

You should see your portfolio website running securely with HTTPS.

---

## Optional: Full Automated Deployment Script

Save the following as `deploy.sh` on your server to automate the above steps (after uploading your cert files):

```bash
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
```

Make it executable and run:

```bash
chmod +x deploy.sh
./deploy.sh
```

---

## Final Notes

* Keep your private key secure.
* If you update your Docker image or certificate, rerun steps 3, 4, 5, and 6 accordingly.
* For automatic certificate renewal, consider using **Certbot** and Let's Encrypt if you want free automated certs in future.
* Open ports 80 and 443 in your EC2 security group.

---
