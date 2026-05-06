# Taxi Business Website (Astro)

Mobile-first, SEO-focused static site for a taxi business.

## Run locally

- `npm install`
- `npm run dev`

## Build for cPanel/static hosting

- `npm run build`
- Upload all files from `dist/` to `public_html` on your hosting panel.

## Update before go-live

Edit `src/site-config.ts`:

- `businessName`
- `siteUrl` (production domain)
- `phoneDisplay` and `phoneHref`
- `whatsappNumber`
- `formEndpoint` (Formspree/Getform/Web3Forms URL)

Also set the final sitemap URL in `public/robots.txt`.
