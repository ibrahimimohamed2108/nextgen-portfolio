# Docker Deployment Guide

This guide explains how to deploy the NextGen Portfolio using Docker.

## 🐳 Docker Hub Repository

The Docker image is available at: [`ibrahimimohamed2108/nextgen-portfolio`](https://hub.docker.com/repository/docker/ibrahimimohamed2108/nextgen-portfolio)

## 🚀 Quick Start

### Pull and Run
```bash
# Pull the latest image
docker pull ibrahimimohamed2108/nextgen-portfolio:latest

# Run the container
docker run -d -p 8080:80 --name nextgen-portfolio ibrahimimohamed2108/nextgen-portfolio:latest
```

Your portfolio will be available at: http://localhost:8080

### Using PowerShell Deployment Script
```powershell
# Deploy on default port 8080
.\deploy.ps1

# Deploy on custom port
.\deploy.ps1 -Port 3000

# Deploy specific version
.\deploy.ps1 -Tag v1.0

# Stop the container
.\deploy.ps1 -Stop

# Remove the container
.\deploy.ps1 -Remove
```

## 🏗️ Building Locally

```bash
# Build the image
docker build -t nextgen-portfolio .

# Run locally built image
docker run -d -p 8080:80 --name nextgen-portfolio nextgen-portfolio
```

## 📝 Available Tags

- `latest` - Latest stable version
- `v1.0` - Version 1.0 release

## 🔧 Container Details

- **Base Image**: nginx:alpine
- **Port**: 80 (internal)
- **Health Check**: Enabled (checks every 30s)
- **Size**: ~75MB

## 🌐 Production Deployment

For production deployment, you can use Docker Compose:

```yaml
version: '3.8'
services:
  portfolio:
    image: ibrahimimohamed2108/nextgen-portfolio:latest
    ports:
      - "80:80"
    restart: unless-stopped
    healthcheck:
      test: ["CMD", "curl", "-f", "http://localhost:80/"]
      interval: 30s
      timeout: 10s
      retries: 3
```

## 🛠️ Development

For development, you can still use the local development server:

```bash
npm run dev
```

## 📋 Environment Variables

Currently, the application doesn't require any environment variables for basic functionality.

## 🔍 Troubleshooting

### Check container logs
```bash
docker logs nextgen-portfolio
```

### Check container health
```bash
docker inspect --format='{{.State.Health.Status}}' nextgen-portfolio
```

### Access container shell
```bash
docker exec -it nextgen-portfolio sh
```

