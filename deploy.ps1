# NextGen Portfolio Deployment Script
# This script helps deploy the portfolio using Docker

param(
    [string]$Port = "8080",
    [string]$Tag = "latest",
    [switch]$Stop,
    [switch]$Remove
)

$ContainerName = "nextgen-portfolio"
$ImageName = "ibrahimimohamed2108/nextgen-portfolio:$Tag"

if ($Stop) {
    Write-Host "Stopping container: $ContainerName" -ForegroundColor Yellow
    docker stop $ContainerName
    exit 0
}

if ($Remove) {
    Write-Host "Removing container: $ContainerName" -ForegroundColor Yellow
    docker stop $ContainerName 2>$null
    docker rm $ContainerName 2>$null
    exit 0
}

# Stop and remove existing container if it exists
Write-Host "Checking for existing container..." -ForegroundColor Blue
docker stop $ContainerName 2>$null
docker rm $ContainerName 2>$null

# Pull latest image
Write-Host "Pulling latest image: $ImageName" -ForegroundColor Blue
docker pull $ImageName

# Run the container
Write-Host "Starting container on port $Port" -ForegroundColor Green
docker run -d -p ${Port}:80 --name $ContainerName $ImageName

# Check if container is running
Start-Sleep 3
$Status = docker ps --filter "name=$ContainerName" --format "table {{.Status}}"
if ($Status -match "Up") {
    Write-Host "✅ Portfolio is now running at: http://localhost:$Port" -ForegroundColor Green
    Write-Host "Container status: $Status" -ForegroundColor Green
} else {
    Write-Host "❌ Failed to start container" -ForegroundColor Red
    docker logs $ContainerName
}

