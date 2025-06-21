# 🚀 NextGen Portfolio Website Deployment Guide

**Deploy a Dockerized Portfolio Website on AWS EC2 with Docker, Nginx, and TLS Security**

---

## 📋 Table of Contents

1. [Overview](#overview)
2. [Prerequisites](#prerequisites)
3. [Quick Start](#quick-start)
4. [Detailed Setup](#detailed-setup)
5. [Optional Features](#optional-features)
6. [Troubleshooting](#troubleshooting)
7. [Maintenance](#maintenance)

---

## 🎯 Overview

This comprehensive guide walks you through deploying a secure, production-ready portfolio website using modern DevOps practices. You'll set up:

- **Containerized Application**: Docker-based NextGen Portfolio
- **Reverse Proxy**: Nginx for load balancing and SSL termination
- **Security**: TLS/SSL encryption with commercial certificates
- **Monitoring**: Optional Netdata integration for system insights
- **Automation**: Scripts for streamlined deployment

### Architecture Diagram

```
Internet → AWS EC2 Security Group → Nginx (443/80) → Docker Container (3000)
                                       ↓
                                 Netdata (19999) [Optional]
```

---

## ✅ Prerequisites

### Infrastructure Requirements

| Component | Specification |
|-----------|---------------|
| **Server** | Ubuntu EC2 instance (t2.micro or larger) |
| **Access** | SSH key pair for EC2 connection |
| **Network** | Security group with ports 80, 443, 22 open |
| **Storage** | Minimum 8GB available disk space |

### Domain & Security

- [ ] **Domain Name**: Registered domain (e.g., `ibrahimi.software`)
- [ ] **DNS Management**: Access to domain registrar (Name.com, etc.)
- [ ] **SSL Certificate**: Commercial TLS certificate from trusted CA
- [ ] **Certificate Files**:
  - `certificate.crt` - Your domain certificate
  - `ca_bundle.crt` - Intermediate CA bundle
  - `private.key` - Private Key (keep secure!)

### Application Assets

- [ ] **Docker Image**: `ibrahimimohamed2108/nextgen-portfolio:v1.1`
- [ ] **Repository Access**: DockerHub pull permissions

---

## 🚀 Quick Start

For experienced users, here's the express deployment:

```bash
# 1. Upload certificates to ~/
scp certificate.crt ca_bundle.crt private.key ubuntu@your-ec2-ip:~/

# 2. SSH and run automated script
ssh ubuntu@your-ec2-ip
wget -O deploy.sh https://your-script-url/deploy.sh
chmod +x deploy.sh && ./deploy.sh
```

**⚡ Your site will be live at `https://yourdomain.com` in ~5 minutes!**

---

## 🔧 Detailed Setup

### Step 1: Domain & Certificate Preparation

#### 1.1 Generate Certificate Signing Request (CSR)

```bash
# On your local machine or server
openssl req -newkey rsa:2048 -nodes \
  -keyout private.key \
  -out request.csr \
  -subj "/CN=ibrahimi.software"
```

#### 1.2 Obtain SSL Certificate

1. **Submit CSR** to your Certificate Authority (Sectigo/Name.com)
2. **Complete domain validation** process
3. **Download certificate bundle** containing:
   - Domain certificate (`certificate.crt`)
   - Intermediate CA bundle (`ca_bundle.crt`)

#### 1.3 Upload Certificates to Server

```bash
# Transfer files to EC2 instance
scp certificate.crt ca_bundle.crt private.key ubuntu@your-ec2-ip:~/
```

### Step 2: Server Environment Setup

#### 2.1 Connect to EC2 Instance

```bash
ssh -i your-key.pem ubuntu@your-ec2-ip
```

#### 2.2 Install Required Software

```bash
# Update system packages
sudo apt update && sudo apt upgrade -y

# Install Docker and Nginx
sudo apt install -y docker.io nginx

# Start and enable services
sudo systemctl start docker nginx
sudo systemctl enable docker nginx

# Verify installations
docker --version
nginx -v
```

### Step 3: Application Deployment

#### 3.1 Deploy Portfolio Container

```bash
# Remove any existing containers
sudo docker stop nextgen-portfolio 2>/dev/null || true
sudo docker rm nextgen-portfolio 2>/dev/null || true

# Pull latest image and run container
sudo docker pull ibrahimimohamed2108/nextgen-portfolio:v1.1
sudo docker run -d \
  --name nextgen-portfolio \
  --restart unless-stopped \
  -p 3000:80 \
  ibrahimimohamed2108/nextgen-portfolio:v1.1

# Verify container is running
sudo docker ps | grep nextgen-portfolio
```

#### 3.2 Test Application

```bash
# Test local connectivity
curl -I http://localhost:3000
# Should return HTTP 200 OK
```

### Step 4: SSL Certificate Configuration

#### 4.1 Create Certificate Directory

```bash
# Create secure directory for certificates
sudo mkdir -p /etc/ssl/ibrahimi.software

# Copy certificates with proper names
sudo cp ~/certificate.crt /etc/ssl/ibrahimi.software/fullchain.crt
sudo cp ~/ca_bundle.crt /etc/ssl/ibrahimi.software/ca_bundle.crt
sudo cp ~/private.key /etc/ssl/ibrahimi.software/private.key

# Set secure permissions
sudo chmod 644 /etc/ssl/ibrahimi.software/*.crt
sudo chmod 600 /etc/ssl/ibrahimi.software/private.key
sudo chown root:root /etc/ssl/ibrahimi.software/*
```

#### 4.2 Verify Certificate Chain

```bash
# Test certificate validity
sudo openssl x509 -in /etc/ssl/ibrahimi.software/fullchain.crt -text -noout | head -20
```

### Step 5: Nginx Reverse Proxy Configuration

#### 5.1 Backup Default Configuration

```bash
sudo cp /etc/nginx/sites-available/default /etc/nginx/sites-available/default.backup
```

#### 5.2 Create Production Configuration

```bash
sudo tee /etc/nginx/sites-available/default > /dev/null << 'EOF'
# HTTP to HTTPS Redirect
server {
    listen 80;
    listen [::]:80;
    server_name ibrahimi.software www.ibrahimi.software;
    
    # Security headers for HTTP
    add_header X-Content-Type-Options nosniff;
    add_header X-Frame-Options DENY;
    
    # Redirect all HTTP traffic to HTTPS
    return 301 https://$server_name$request_uri;
}

# HTTPS Server Block
server {
    listen 443 ssl http2;
    listen [::]:443 ssl http2;
    server_name ibrahimi.software www.ibrahimi.software;
    
    # SSL Configuration
    ssl_certificate /etc/ssl/ibrahimi.software/fullchain.crt;
    ssl_certificate_key /etc/ssl/ibrahimi.software/private.key;
    ssl_trusted_certificate /etc/ssl/ibrahimi.software/ca_bundle.crt;
    
    # Modern SSL Configuration
    ssl_protocols TLSv1.2 TLSv1.3;
    ssl_ciphers ECDHE-ECDSA-AES128-GCM-SHA256:ECDHE-RSA-AES128-GCM-SHA256:ECDHE-ECDSA-AES256-GCM-SHA384:ECDHE-RSA-AES256-GCM-SHA384;
    ssl_prefer_server_ciphers off;
    ssl_session_timeout 1d;
    ssl_session_cache shared:SSL:50m;
    ssl_stapling on;
    ssl_stapling_verify on;
    
    # Security Headers
    add_header Strict-Transport-Security "max-age=63072000" always;
    add_header X-Content-Type-Options nosniff;
    add_header X-Frame-Options DENY;
    add_header X-XSS-Protection "1; mode=block";
    add_header Referrer-Policy "strict-origin-when-cross-origin";
    
    # Main Application Proxy
    location / {
        proxy_pass http://127.0.0.1:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
        
        # Timeouts
        proxy_connect_timeout 30s;
        proxy_send_timeout 30s;
        proxy_read_timeout 30s;
    }
    
    # Health Check Endpoint
    location /health {
        access_log off;
        return 200 "healthy\n";
        add_header Content-Type text/plain;
    }
    
    # Optional: Monitoring Endpoint (Netdata)
    location /monitoring/ {
        proxy_pass http://127.0.0.1:19999/;
        proxy_http_version 1.1;
        proxy_pass_request_headers on;
        proxy_set_header Host $host;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_redirect off;
        
        # Optional: Enable basic authentication
        # auth_basic "Monitoring Access";
        # auth_basic_user_file /etc/nginx/.htpasswd;
    }
}
EOF
```

#### 5.3 Validate and Apply Configuration

```bash
# Test configuration syntax
sudo nginx -t

# If test passes, reload Nginx
sudo systemctl reload nginx

# Check status
sudo systemctl status nginx
```

### Step 6: DNS Configuration

#### 6.1 Update DNS Records

Configure these DNS records with your domain registrar:

| Type | Name | Value | TTL |
|------|------|-------|-----|
| A | @ | `your-ec2-public-ip` | 300 |
| A | www | `your-ec2-public-ip` | 300 |

#### 6.2 Verify DNS Propagation

```bash
# Check DNS resolution
nslookup ibrahimi.software
dig ibrahimi.software +short
```

### Step 7: Final Verification

#### 7.1 Test HTTPS Access

```bash
# Test SSL connectivity
curl -I https://ibrahimi.software
openssl s_client -connect ibrahimi.software:443 -servername ibrahimi.software
```

#### 7.2 Browser Verification

1. Navigate to `https://ibrahimi.software`
2. Verify SSL certificate is valid (green padlock)
3. Test HTTP redirect: `http://ibrahimi.software` → `https://ibrahimi.software`

---

## 🔧 Optional Features

### Monitoring with Netdata

#### Install Netdata Container

```bash
sudo docker run -d \
  --name netdata \
  --restart unless-stopped \
  -p 127.0.0.1:19999:19999 \
  --cap-add SYS_PTRACE \
  --security-opt apparmor=unconfined \
  -v netdataconfig:/etc/netdata \
  -v netdatalib:/var/lib/netdata \
  -v netdatacache:/var/cache/netdata \
  -v /etc/passwd:/host/etc/passwd:ro \
  -v /etc/group:/host/etc/group:ro \
  -v /proc:/host/proc:ro \
  -v /sys:/host/sys:ro \
  -v /etc/os-release:/host/etc/os-release:ro \
  netdata/netdata
```

#### Secure Monitoring Access

```bash
# Install password utility
sudo apt install apache2-utils

# Create password file
sudo htpasswd -c /etc/nginx/.htpasswd admin

# Uncomment auth_basic lines in Nginx config
sudo sed -i 's/# auth_basic/auth_basic/g' /etc/nginx/sites-available/default
sudo nginx -t && sudo systemctl reload nginx
```

Access monitoring at: `https://ibrahimi.software/monitoring`

### Automated Deployment Script

<details>
<summary>Click to expand full automation script</summary>

```bash
#!/bin/bash
# deploy.sh - Automated NextGen Portfolio Deployment

set -euo pipefail

# Configuration
DOMAIN="ibrahimi.software"
DOCKER_IMAGE="ibrahimimohamed2108/nextgen-portfolio:v1.1"
CERT_DIR="/etc/ssl/$DOMAIN"

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

log() {
    echo -e "${GREEN}[$(date +'%Y-%m-%d %H:%M:%S')] $1${NC}"
}

warn() {
    echo -e "${YELLOW}[WARNING] $1${NC}"
}

error() {
    echo -e "${RED}[ERROR] $1${NC}"
    exit 1
}

# Check if running as non-root
if [[ $EUID -eq 0 ]]; then
   error "This script should not be run as root for security reasons"
fi

# Verify certificate files exist
for cert_file in certificate.crt ca_bundle.crt private.key; do
    if [[ ! -f "$HOME/$cert_file" ]]; then
        error "Certificate file $cert_file not found in home directory"
    fi
done

log "Starting NextGen Portfolio deployment..."

# Update system and install packages
log "Updating system packages..."
sudo apt update -qq
sudo apt install -y docker.io nginx apache2-utils

# Start services
log "Starting Docker and Nginx services..."
sudo systemctl start docker nginx
sudo systemctl enable docker nginx

# Deploy application container
log "Deploying portfolio container..."
sudo docker stop nextgen-portfolio 2>/dev/null || true
sudo docker rm nextgen-portfolio 2>/dev/null || true
sudo docker pull "$DOCKER_IMAGE"
sudo docker run -d \
    --name nextgen-portfolio \
    --restart unless-stopped \
    -p 3000:80 \
    "$DOCKER_IMAGE"

# Deploy monitoring container
log "Deploying monitoring container..."
sudo docker stop netdata 2>/dev/null || true
sudo docker rm netdata 2>/dev/null || true
sudo docker run -d \
    --name netdata \
    --restart unless-stopped \
    -p 127.0.0.1:19999:19999 \
    --cap-add SYS_PTRACE \
    --security-opt apparmor=unconfined \
    -v netdataconfig:/etc/netdata \
    -v netdatalib:/var/lib/netdata \
    -v netdatacache:/var/cache/netdata \
    -v /etc/passwd:/host/etc/passwd:ro \
    -v /etc/group:/host/etc/group:ro \
    -v /proc:/host/proc:ro \
    -v /sys:/host/sys:ro \
    -v /etc/os-release:/host/etc/os-release:ro \
    netdata/netdata

# Setup SSL certificates
log "Configuring SSL certificates..."
sudo mkdir -p "$CERT_DIR"
sudo cp "$HOME/certificate.crt" "$CERT_DIR/fullchain.crt"
sudo cp "$HOME/ca_bundle.crt" "$CERT_DIR/ca_bundle.crt"
sudo cp "$HOME/private.key" "$CERT_DIR/private.key"
sudo chmod 644 "$CERT_DIR"/*.crt
sudo chmod 600 "$CERT_DIR/private.key"
sudo chown root:root "$CERT_DIR"/*

# Configure Nginx
log "Configuring Nginx reverse proxy..."
sudo cp /etc/nginx/sites-available/default /etc/nginx/sites-available/default.backup

# [Nginx configuration content would go here - same as above]

# Test and reload Nginx
log "Testing Nginx configuration..."
sudo nginx -t
sudo systemctl reload nginx

# Verify deployment
log "Verifying deployment..."
sleep 5

if curl -s -o /dev/null -w "%{http_code}" http://localhost:3000 | grep -q "200"; then
    log "✅ Application container is responding"
else
    warn "❌ Application container may not be responding correctly"
fi

if curl -s -o /dev/null -w "%{http_code}" http://127.0.0.1:19999 | grep -q "200"; then
    log "✅ Monitoring container is responding"
else
    warn "❌ Monitoring container may not be responding correctly"
fi

log "🎉 Deployment completed successfully!"
log "🌐 Your website should be available at: https://$DOMAIN"
log "📊 Monitoring available at: https://$DOMAIN/monitoring"
log ""
log "Next steps:"
log "1. Update your DNS records to point to this server's IP"
log "2. Test your website in a browser"
log "3. Set up monitoring password if desired"
```

</details>

---

## 🔍 Troubleshooting

### Common Issues and Solutions

#### SSL Certificate Problems

**Problem**: "SSL certificate verification failed"
```bash
# Solution: Verify certificate chain
sudo openssl verify -CAfile /etc/ssl/ibrahimi.software/ca_bundle.crt \
  /etc/ssl/ibrahimi.software/fullchain.crt
```

**Problem**: "Private key doesn't match certificate"
```bash
# Solution: Compare certificate and key modulus
sudo openssl x509 -noout -modulus -in /etc/ssl/ibrahimi.software/fullchain.crt | openssl md5
sudo openssl rsa -noout -modulus -in /etc/ssl/ibrahimi.software/private.key | openssl md5
# These should match
```

#### Docker Container Issues

**Problem**: Container not starting
```bash
# Check container logs
sudo docker logs nextgen-portfolio

# Check if port is already in use
sudo netstat -tulpn | grep :3000

# Restart container
sudo docker restart nextgen-portfolio
```

#### Nginx Configuration Problems

**Problem**: "502 Bad Gateway"
```bash
# Check if application is running
curl http://localhost:3000

# Check Nginx error logs
sudo tail -f /var/log/nginx/error.log

# Verify proxy settings
sudo nginx -T | grep proxy_pass
```

### Log Locations

| Service | Log Location |
|---------|-------------|
| Nginx Access | `/var/log/nginx/access.log` |
| Nginx Error | `/var/log/nginx/error.log` |
| Docker Container | `sudo docker logs nextgen-portfolio` |
| System | `sudo journalctl -u nginx -f` |

---

## 🔄 Maintenance

### Regular Tasks

#### Update Docker Images

```bash
# Pull latest image
sudo docker pull ibrahimimohamed2108/nextgen-portfolio:latest

# Stop current container
sudo docker stop nextgen-portfolio

# Remove old container
sudo docker rm nextgen-portfolio

# Start new container
sudo docker run -d --name nextgen-portfolio --restart unless-stopped -p 3000:80 \
  ibrahimimohamed2108/nextgen-portfolio:latest
```

#### Certificate Renewal

```bash
# Check certificate expiration
sudo openssl x509 -in /etc/ssl/ibrahimi.software/fullchain.crt -noout -dates

# Replace certificates (when renewed)
sudo cp ~/new-certificate.crt /etc/ssl/ibrahimi.software/fullchain.crt
sudo systemctl reload nginx
```

#### System Updates

```bash
# Update system packages
sudo apt update && sudo apt upgrade -y

# Clean up Docker resources
sudo docker system prune -f

# Restart services if needed
sudo systemctl restart nginx docker
```

### Backup Strategy

#### Configuration Backup

```bash
# Create backup directory
mkdir -p ~/backups/$(date +%Y%m%d)

# Backup Nginx configuration
sudo cp /etc/nginx/sites-available/default ~/backups/$(date +%Y%m%d)/nginx-config

# Backup SSL certificates (store securely!)
sudo cp -r /etc/ssl/ibrahimi.software ~/backups/$(date +%Y%m%d)/ssl-certs
```

#### Automated Backup Script

```bash
#!/bin/bash
# backup.sh - Weekly backup automation

BACKUP_DIR="$HOME/backups/$(date +%Y%m%d)"
mkdir -p "$BACKUP_DIR"

# Backup configurations
sudo cp /etc/nginx/sites-available/default "$BACKUP_DIR/nginx-config"
sudo docker inspect nextgen-portfolio > "$BACKUP_DIR/docker-config.json"

# Archive and compress
tar -czf "$BACKUP_DIR.tar.gz" "$BACKUP_DIR"
rm -rf "$BACKUP_DIR"

echo "Backup completed: $BACKUP_DIR.tar.gz"
```

---

## 📚 Additional Resources

### Documentation Links

- [Docker Official Documentation](https://docs.docker.com/)
- [Nginx Configuration Guide](https://nginx.org/en/docs/)
- [Mozilla SSL Configuration Generator](https://ssl-config.mozilla.org/)
- [AWS EC2 User Guide](https://docs.aws.amazon.com/ec2/)

### Security Best Practices

- **Keep system updated**: Regular security patches
- **Firewall configuration**: Restrict unnecessary ports
- **SSH hardening**: Disable password authentication
- **Log monitoring**: Set up log analysis tools
- **Certificate monitoring**: Monitor certificate expiration

### Performance Optimization

- **Enable Gzip compression** in Nginx
- **Configure browser caching** headers
- **Implement rate limiting** for API endpoints
- **Monitor resource usage** with Netdata
- **Set up CDN** for static assets

---

## 📞 Support

If you encounter issues with this deployment guide:

1. **Check the troubleshooting section** above
2. **Review log files** for specific error messages
3. **Verify prerequisites** are met
4. **Test each step individually** to isolate problems

---

*Last updated: June 2025 | Version 4.0*