# Deployment Guide - Taxi Biz App

This guide covers various deployment options for the Taxi Biz Astro application.

## Prerequisites

- Node.js >= 20.11.0
- npm or yarn package manager
- Git

## Build the Application

Before deploying, build the production version:

```bash
npm install
npm run build
```

This will generate the static files in the `dist/` directory.

---

## Deployment Options

### 1. Vercel (Recommended)

Vercel provides excellent support for Astro with automatic deployments.

**Steps:**

1. Push your code to GitHub
2. Go to [vercel.com](https://vercel.com) and sign up/login
3. Click "Add New Project"
4. Import your GitHub repository: `Devopsguyindia/Taxi-Biz-App`
5. Vercel will automatically detect Astro and configure settings
6. Click "Deploy"

**Environment Variables (if needed):**
- No environment variables required for static site

**Custom Domain:**
- Add your custom domain in Vercel dashboard
- Update DNS records as instructed

---

### 2. Netlify

Netlify is another great option for static sites with built-in CI/CD.

**Steps:**

1. Push your code to GitHub
2. Go to [netlify.com](https://netlify.com) and sign up/login
3. Click "Add new site" → "Import an existing project"
4. Connect to GitHub and select your repository
5. Configure build settings:
   - **Build command:** `npm run build`
   - **Publish directory:** `dist`
6. Click "Deploy site"

**Custom Domain:**
- Add domain in Netlify dashboard
- Update DNS records

---

### 3. GitHub Pages

Free hosting directly from your GitHub repository.

**Steps:**

1. Create a `.github/workflows/deploy.yml` file:

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [ main ]
  workflow_dispatch:

permissions:
  contents: read
  pages: write
  id-token: write

concurrency:
  group: "pages"
  cancel-in-progress: false

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout
        uses: actions/checkout@v4
      
      - name: Setup Node
        uses: actions/setup-node@v4
        with:
          node-version: "20"
          cache: 'npm'
      
      - name: Install dependencies
        run: npm ci
      
      - name: Build
        run: npm run build
      
      - name: Upload artifact
        uses: actions/upload-pages-artifact@v3
        with:
          path: ./dist
      
      - name: Deploy to GitHub Pages
        id: deployment
        uses: actions/deploy-pages@v4
```

2. Push this file to your repository
3. Go to GitHub repository Settings → Pages
4. Under "Build and deployment", select "Source" as "GitHub Actions"
5. The site will deploy automatically on push to main

**URL:** `https://devopsguyindia.github.io/Taxi-Biz-App/`

---

### 4. cPanel/Shared Hosting

Traditional hosting via FTP/SFTP.

**Steps:**

1. Build the project locally:
   ```bash
   npm run build
   ```

2. Access your cPanel hosting account
3. Open File Manager
4. Navigate to `public_html` (or your desired subdirectory)
5. Upload all contents from the `dist/` folder
6. Ensure `.htaccess` exists for proper routing

**Note:** If deploying to a subdirectory, update `src/site-config.ts`:
```typescript
siteUrl: 'https://yourdomain.com/subdirectory'
```

---

### 5. Cloudflare Pages

Fast global CDN with automatic deployments.

**Steps:**

1. Go to [dash.cloudflare.com](https://dash.cloudflare.com)
2. Navigate to Workers & Pages → Create application → Pages
3. Connect to Git and select your repository
4. Configure build settings:
   - **Build command:** `npm run build`
   - **Build output directory:** `dist`
5. Click "Save and Deploy"

---

### 6. AWS S3 + CloudFront

For enterprise-level hosting with AWS.

**Steps:**

1. Create an S3 bucket and enable static website hosting
2. Upload `dist/` contents to the bucket
3. Set bucket policy for public read access
4. Create CloudFront distribution pointing to S3
5. Configure custom domain and SSL certificate

**CLI Deployment (using AWS CLI):**
```bash
aws s3 sync ./dist s3://your-bucket-name --delete
```

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

---

## Post-Deployment Tasks

1. **Submit Sitemap to Search Engines:**
   - Google Search Console: Submit `sitemap.xml`
   - Bing Webmaster Tools: Submit `sitemap.xml`

2. **Enable Analytics:**
   - Add Google Analytics or similar tracking
   - Configure in `src/layouts/BaseLayout.astro`

3. **Set up SSL:**
   - Ensure HTTPS is enabled (most modern hosts provide free SSL via Let's Encrypt)

4. **Monitor Performance:**
   - Use PageSpeed Insights
   - Check Lighthouse scores
   - Monitor Core Web Vitals

---

## Troubleshooting

**Build fails:**
- Ensure Node.js version >= 20.11.0
- Delete `node_modules` and run `npm install`
- Check for TypeScript errors with `npm run astro check`

**404 errors on subdirectory deployment:**
- Update `astro.config.mjs` to set `base: '/your-subdirectory'`
- Update `src/site-config.ts` `siteUrl` accordingly

**Forms not working:**
- Verify `formEndpoint` is correctly configured
- Test with Formspree/Getform/Web3Forms dashboard
- Check browser console for errors

---

## Environment-Specific Configurations

### Development
```bash
npm run dev
# Runs on http://localhost:4321
```

### Production Build
```bash
npm run build
# Outputs to dist/
```

### Preview Production Build
```bash
npm run preview
# Serves dist/ locally
```

---

## Support

For issues related to:
- **Astro framework:** [Astro Documentation](https://docs.astro.build)
- **Deployment platforms:** Check respective platform documentation
- **This project:** Open an issue on GitHub

---

## Continuous Deployment

For automated deployments on push:

- **Vercel/Netlify:** Automatic on git push
- **GitHub Pages:** Configured via GitHub Actions
- **Cloudflare Pages:** Automatic on git push
- **cPanel:** Manual deployment required (or use CI/CD scripts)

---

**Last Updated:** June 2026
