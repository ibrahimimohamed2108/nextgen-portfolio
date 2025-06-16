
# 🚀 Deploy a Dockerized Web App on AWS EC2 with a Custom Domain

This guide explains how to deploy a Dockerized web application on an AWS EC2 instance, connect it to a custom domain (e.g., purchased from Name.com), and optionally secure it with HTTPS using Nginx and Certbot.

---

## 📦 Prerequisites

- A **Dockerized** web application (React, Vue, static site, etc.)
- A **Docker Hub** account (or another container registry)
- An **AWS Free Tier account**
- A **domain name** (e.g., from [Name.com](https://name.com))

---

## 🧱 1. Build and Push the Docker Image

### 🔧 Example Dockerfile

```Dockerfile
FROM node:18

WORKDIR /app
COPY . .
RUN npm install && npm run build
RUN npm install -g serve
EXPOSE 80
CMD ["serve", "-s", "dist", "-l", "80"]
````

### 🐳 Build and Push

```bash
docker build -t <your-dockerhub-username>/<app-name>:<version> .
docker push <your-dockerhub-username>/<app-name>:<version>
```

---

## ☁️ 2. Launch an EC2 Instance

1. Go to the [AWS EC2 Console](https://console.aws.amazon.com/ec2/)

2. Launch an Ubuntu instance with:

   * **Type:** `t2.micro` (Free Tier)
   * **Security Group Rules**:

     * SSH (22) – from your IP
     * HTTP (80) – from anywhere
     * HTTPS (443) – from anywhere (optional)

3. Download your `.pem` key during launch — you'll use it for SSH access.

---

## 🔐 3. Connect to EC2 via SSH

```bash
ssh -i <your-key>.pem ubuntu@<ec2-public-ip>
```

---

## 🐳 4. Install Docker on EC2

```bash
sudo apt update
sudo apt install -y docker.io
sudo systemctl enable docker
sudo systemctl start docker
```

---

## 🚀 5. Run Your Docker Container

```bash
sudo docker run -d -p 3000:80 <your-dockerhub-username>/<app-name>:<version>
```

Your app is now accessible via port `3000`.

---

## 🌐 6. Point Your Domain to EC2

1. Log into your domain registrar (e.g., [Name.com](https://name.com))
2. Navigate to **DNS Management**
3. Create an **A record**:

| Type | Host | Answer (Value)    | TTL |
| ---- | ---- | ----------------- | --- |
| A    | `@`  | `<ec2-public-ip>` | 300 |

⏳ Wait \~5–15 minutes for DNS propagation.

---

## 🔁 7. Install and Configure Nginx

### Install Nginx

```bash
sudo apt install -y nginx
```

### Configure Reverse Proxy

```bash
sudo nano /etc/nginx/sites-available/webapp
```

Paste the following:

```nginx
server {
    listen 80;
    server_name yourdomain.com;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

Enable the config:

```bash
sudo ln -s /etc/nginx/sites-available/webapp /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl restart nginx
```

✅ Visit: `http://yourdomain.com`

---

## 🔐 8. \[Optional] Enable HTTPS with Certbot

### Install Certbot

```bash
sudo apt install certbot python3-certbot-nginx
```

### Run Certbot

```bash
sudo certbot --nginx -d yourdomain.com
```

* Certbot will automatically configure SSL and enable HTTPS redirection.
* It will also auto-renew the certificate.

✅ Visit: `https://yourdomain.com`

---

## ❌ Skip HTTPS? Use HTTP Only

If you don’t want to use HTTPS, you can skip Step 8 entirely. Your app will still be accessible at:

```text
http://yourdomain.com
```

⚠️ Note: Browsers may mark HTTP sites as "Not Secure."

---

## 🔁 \[Optional] Auto-Restart Docker on Reboot

```bash
sudo docker run -d --restart always -p 3000:80 <your-dockerhub-username>/<app-name>:<version>
```

---

## ✅ Done!

You now have a production-ready deployment pipeline:

* AWS EC2 running Docker
* Nginx reverse proxy
* Custom domain mapped to your IP
* Optional HTTPS using Let's Encrypt

---

## 🛠 Future Enhancements

* Use Docker Compose for multi-container apps
* Automate with GitHub Actions + EC2 CLI
* Use Route 53 instead of Name.com
* Infrastructure-as-code (Terraform, Pulumi)
* SSL monitoring and alerts

---


Built with ❤️ by [M.IBRAHIMI]

# Welcome to your Lovable project

## Project info

**URL**: https://lovable.dev/projects/0add3204-227a-4fc5-8f86-baf03b1ad2a1

## How can I edit this code?

There are several ways of editing your application.

**Use Lovable**

Simply visit the [Lovable Project](https://lovable.dev/projects/0add3204-227a-4fc5-8f86-baf03b1ad2a1) and start prompting.

Changes made via Lovable will be committed automatically to this repo.

**Use your preferred IDE**

If you want to work locally using your own IDE, you can clone this repo and push changes. Pushed changes will also be reflected in Lovable.

The only requirement is having Node.js & npm installed - [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating)

Follow these steps:

```sh
# Step 1: Clone the repository using the project's Git URL.
git clone <YOUR_GIT_URL>

# Step 2: Navigate to the project directory.
cd <YOUR_PROJECT_NAME>

# Step 3: Install the necessary dependencies.
npm i

# Step 4: Start the development server with auto-reloading and an instant preview.
npm run dev
```

**Edit a file directly in GitHub**

- Navigate to the desired file(s).
- Click the "Edit" button (pencil icon) at the top right of the file view.
- Make your changes and commit the changes.

**Use GitHub Codespaces**

- Navigate to the main page of your repository.
- Click on the "Code" button (green button) near the top right.
- Select the "Codespaces" tab.
- Click on "New codespace" to launch a new Codespace environment.
- Edit files directly within the Codespace and commit and push your changes once you're done.

## What technologies are used for this project?

This project is built with:

- Vite
- TypeScript
- React
- shadcn-ui
- Tailwind CSS

## How can I deploy this project?

Simply open [Lovable](https://lovable.dev/projects/0add3204-227a-4fc5-8f86-baf03b1ad2a1) and click on Share -> Publish.

## Can I connect a custom domain to my Lovable project?

Yes, you can!

To connect a domain, navigate to Project > Settings > Domains and click Connect Domain.

Read more here: [Setting up a custom domain](https://docs.lovable.dev/tips-tricks/custom-domain#step-by-step-guide)
