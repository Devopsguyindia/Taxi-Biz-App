# Deployment Guide - Taxi Biz App

This guide covers deploying the Taxi Biz Astro application on an Ubuntu VPS with Nginx.

## Prerequisites

### Local Machine
- Node.js >= 20.11.0
- npm or yarn package manager
- Git

### Ubuntu VPS
- Ubuntu 20.04 or 22.04 LTS
- SSH access with sudo privileges
- A domain name pointed to your VPS IP address
- Nginx already installed and configured (shared environment)

## Build the Application

Before deploying, build the production version locally:

```bash
npm install
npm run build
```

This will generate the static files in the `dist/` directory.

---

## Deployment on Ubuntu VPS with Nginx

### Step 1: Connect to Your VPS

```bash
ssh user@your-vps-ip
```

### Step 2: Update System and Install Required Packages

```bash
sudo apt update && sudo apt upgrade -y
sudo apt install -y git curl
```

**Note:** Nginx is already installed on this shared server. Do not reinstall or modify the main Nginx configuration.

### Step 3: Install Node.js on VPS

Install Node.js 20.x using NodeSource repository:

```bash
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt install -y nodejs
```

Verify installation:

```bash
node --version
npm --version
```

### Step 4: Clone the Repository

```bash
cd /var/www
sudo git clone https://github.com/Devopsguyindia/Taxi-Biz-App.git
sudo chown -R $USER:$USER /var/www/Taxi-Biz-App
cd Taxi-Biz-App
```

### Step 5: Build the Application on VPS

```bash
npm install
npm run build
```

### Step 6: Configure Nginx

**Important:** This is a shared server environment. Only add your site configuration without modifying existing configurations or the main nginx.conf.

First, check existing sites:

```bash
ls -la /etc/nginx/sites-available/
ls -la /etc/nginx/sites-enabled/
```

Create a new Nginx configuration file for your site:

```bash
sudo nano /etc/nginx/sites-available/taxi-biz
```

Add the following configuration:

```nginx
server {
    listen 80;
    listen [::]:80;

    server_name your-domain.com www.your-domain.com;

    root /var/www/Taxi-Biz-App/dist;
    index index.html;

    # Enable gzip compression
    gzip on;
    gzip_vary on;
    gzip_min_length 1024;
    gzip_types text/plain text/css text/xml text/javascript application/x-javascript application/xml+rss application/javascript application/json;

    # Security headers
    add_header X-Frame-Options "SAMEORIGIN" always;
    add_header X-Content-Type-Options "nosniff" always;
    add_header X-XSS-Protection "1; mode=block" always;

    # Cache static assets
    location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg|woff|woff2|ttf|eot)$ {
        expires 1y;
        add_header Cache-Control "public, immutable";
    }

    # Handle all routes for SPA
    location / {
        try_files $uri $uri/ /index.html;
    }

    # Deny access to hidden files
    location ~ /\. {
        deny all;
    }
}
```

Replace `your-domain.com` with your actual domain name.

### Step 7: Enable the Site

```bash
sudo ln -s /etc/nginx/sites-available/taxi-biz /etc/nginx/sites-enabled/
sudo nginx -t
```

**Important:** If the test passes, reload Nginx instead of restart to avoid affecting other sites:

```bash
sudo systemctl reload nginx
```

If the test fails, check the error message and fix your configuration before reloading.

### Step 8: Configure Firewall

**Note:** On a shared server, the firewall is likely already configured. Check current rules before making changes:

```bash
sudo ufw status
```

If HTTP and HTTPS are not allowed, add them:

```bash
sudo ufw allow 'Nginx Full'
sudo ufw allow OpenSSH
```

**Warning:** Do not run `sudo ufw enable` if it's already enabled, as this may lock you out or affect other services.

### Step 9: Set Up SSL with Let's Encrypt

Install Certbot:

```bash
sudo apt install -y certbot python3-certbot-nginx
```

Obtain SSL certificate:

```bash
sudo certbot --nginx -d your-domain.com -d www.your-domain.com
```

**Important:** Certbot will only modify your site's configuration file (`/etc/nginx/sites-available/taxi-biz`), not other sites. Follow the prompts carefully.

After SSL is configured, reload Nginx:

```bash
sudo systemctl reload nginx
```

### Step 10: Set Up Auto-Renewal for SSL

Test renewal:

```bash
sudo certbot renew --dry-run
```

Certbot automatically sets up a cron job for renewal. Verify it:

```bash
sudo systemctl status certbot.timer
```

### Step 11: Update Production Configuration

Edit the site configuration on the VPS:

```bash
cd /var/www/Taxi-Biz-App
nano src/site-config.ts
```

Update with your production values:

```typescript
export const siteConfig = {
  businessName: 'Your Business Name',
  siteUrl: 'https://your-domain.com',
  phoneDisplay: '+91 98765 43210',
  phoneHref: 'tel:+919876543210',
  whatsappNumber: '919876543210',
  formEndpoint: 'https://formspree.io/f/your-form-id',
  // ... other config
}
```

Rebuild after changes:

```bash
npm run build
```

### Step 12: Set Up Automated Deployment (Optional)

Create a deployment script:

```bash
nano /var/www/Taxi-Biz-App/deploy.sh
```

Add the following:

```bash
#!/bin/bash

cd /var/www/Taxi-Biz-App

# Pull latest changes
git pull origin main

# Install dependencies
npm install

# Build the application
npm run build

# Reload Nginx (not strictly necessary for static sites, but safe for shared environment)
sudo systemctl reload nginx

echo "Deployment completed successfully!"
```

**Note:** We use `reload` instead of `restart` to avoid affecting other sites on the shared server.

Make it executable:

```bash
chmod +x /var/www/Taxi-Biz-App/deploy.sh
```

To deploy, simply run:

```bash
/var/www/Taxi-Biz-App/deploy.sh
```

### Step 13: Set Up GitHub Webhook for Auto-Deployment (Optional)

Install webhook handler:

```bash
sudo apt install -y webhook
```

Create webhook configuration:

```bash
sudo nano /etc/webhook/hooks.json
```

Add:

```json
[
  {
    "id": "taxi-biz-deploy",
    "execute-command": "/var/www/Taxi-Biz-App/deploy.sh",
    "command-working-directory": "/var/www/Taxi-Biz-App",
    "pass-arguments-to-command": [
      {
        "source": "payload",
        "name": "head_commit.id"
      }
    ]
  }
]
```

Start webhook service:

```bash
sudo systemctl enable webhook
sudo systemctl start webhook
```

Configure webhook in GitHub repository settings to point to `http://your-domain.com:9000/hooks/taxi-biz-deploy`

---

## Pre-Deployment Checklist

Before deploying to production:

- [ ] Update `src/site-config.ts` with production values:
  - `businessName`: Your actual business name
  - `siteUrl`: Production domain (e.g., `https://taxibiz.com`)
  - `phoneDisplay`: Your contact phone number
  - `phoneHref`: Clickable phone link (e.g., `tel:+919876543210`)
  - `whatsappNumber`: WhatsApp number
  - `formEndpoint`: Form submission service URL

- [ ] Update `public/robots.txt` with your production sitemap URL
- [ ] Test all forms and contact links
- [ ] Verify mobile responsiveness
- [ ] Check SEO meta tags
- [ ] Test all internal links
- [ ] Remove any placeholder content
- [ ] Ensure domain DNS is pointed to VPS IP address
- [ ] Verify VPS firewall allows HTTP (80) and HTTPS (443) traffic

---

## Post-Deployment Tasks

1. **Submit Sitemap to Search Engines:**
   - Google Search Console: Submit `https://your-domain.com/sitemap.xml`
   - Bing Webmaster Tools: Submit `https://your-domain.com/sitemap.xml`

2. **Enable Analytics:**
   - Add Google Analytics or similar tracking
   - Configure in `src/layouts/BaseLayout.astro`
   - Rebuild and redeploy after adding analytics

3. **Verify SSL Certificate:**
   - Check SSL certificate validity at https://www.ssllabs.com/ssltest/
   - Ensure auto-renewal is working

4. **Monitor Performance:**
   - Use PageSpeed Insights
   - Check Lighthouse scores
   - Monitor Core Web Vitals
   - Set up server monitoring (e.g., using htop, netdata)

5. **Set Up Backups:**
   - Configure automated backups of `/var/www/Taxi-Biz-App`
   - Consider using rsync or backup services

---

## Troubleshooting

### Build fails on VPS:
- Ensure Node.js version >= 20.11.0 (`node --version`)
- Delete `node_modules` and run `npm install`
- Check for TypeScript errors with `npm run astro check`
- Ensure sufficient disk space on VPS

### Nginx 502 Bad Gateway:
- Check Nginx error logs: `sudo tail -f /var/log/nginx/error.log`
- Verify Nginx configuration: `sudo nginx -t`
- Restart Nginx: `sudo systemctl restart nginx`

### Site not accessible:
- Check Nginx status: `sudo systemctl status nginx`
- Verify firewall rules: `sudo ufw status`
- Check if domain DNS is correctly pointed
- Test locally on VPS: `curl http://localhost`

### SSL certificate issues:
- Check Certbot logs: `sudo tail -f /var/log/letsencrypt/letsencrypt.log`
- Manually renew: `sudo certbot renew`
- Reconfigure Nginx for SSL: `sudo certbot --nginx`

### Permission issues:
- Ensure correct file ownership: `sudo chown -R www-data:www-data /var/www/Taxi-Biz-App`
- Check file permissions: `ls -la /var/www/Taxi-Biz-App`

### Forms not working:
- Verify `formEndpoint` is correctly configured
- Test with Formspree/Getform/Web3Forms dashboard
- Check browser console for errors
- Ensure form submission service allows your domain

---

## Maintenance Tasks

### Regular Updates

Keep your VPS secure by regularly updating:

```bash
sudo apt update && sudo apt upgrade -y
```

### Monitor Disk Space

Check disk usage regularly:

```bash
df -h
```

### View Nginx Logs

Access logs:
```bash
sudo tail -f /var/log/nginx/access.log
```

Error logs:
```bash
sudo tail -f /var/log/nginx/error.log
```

### Restart Services

Restart Nginx if needed:
```bash
sudo systemctl restart nginx
```

Check Nginx status:
```bash
sudo systemctl status nginx
```

---

## Security Best Practices

1. **Keep system updated:** Regularly run `sudo apt update && sudo apt upgrade -y`
2. **Use SSH keys:** Disable password authentication for SSH
3. **Configure firewall:** Only allow necessary ports (80, 443, 22)
4. **Fail2Ban:** Install and configure Fail2Ban to prevent brute-force attacks
5. **Regular backups:** Set up automated backups of your application
6. **Monitor logs:** Regularly check Nginx and system logs for suspicious activity

---

## Shared Environment Considerations

Since this is a shared server with multiple websites:

1. **Never modify `/etc/nginx/nginx.conf`:** Only work with your site-specific configuration in `sites-available/`
2. **Use `reload` instead of `restart`:** Always use `sudo systemctl reload nginx` to apply changes without affecting other sites
3. **Test configuration before applying:** Always run `sudo nginx -t` before reloading Nginx
4. **Check existing configurations:** Review other site configurations to understand the server setup
5. **Coordinate with server admin:** If you need system-level changes, coordinate with the server administrator
6. **Resource monitoring:** Be mindful of resource usage to avoid affecting other sites
7. **Unique port for webhooks:** If using GitHub webhooks, choose a unique port that doesn't conflict with other services
8. **Separate user accounts:** If possible, use a separate user account for your site for better isolation

---

## Environment-Specific Configurations

### Local Development
```bash
npm run dev
# Runs on http://localhost:4321
```

### Production Build (Local)
```bash
npm run build
# Outputs to dist/
```

### Preview Production Build (Local)
```bash
npm run preview
# Serves dist/ locally
```

### Production Deployment (VPS)
```bash
# On VPS
cd /var/www/Taxi-Biz-App
/var/www/Taxi-Biz-App/deploy.sh
```

---

## Support

For issues related to:
- **Astro framework:** [Astro Documentation](https://docs.astro.build)
- **Nginx:** [Nginx Documentation](https://nginx.org/en/docs/)
- **Ubuntu Server:** [Ubuntu Server Documentation](https://ubuntu.com/server/docs)
- **Let's Encrypt:** [Certbot Documentation](https://certbot.eff.org/docs/)
- **This project:** Open an issue on GitHub

---

**Last Updated:** June 2026
