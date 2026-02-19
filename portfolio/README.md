# cainmenard.com

Personal portfolio website built with Next.js 14, Tailwind CSS, and deployed on Vercel.

## Running Locally

```bash
npm install
npm run dev
```

## Deployment

Deployed via Vercel with custom domain `cainmenard.com`. Push to `main` triggers auto-deploy.

## Domain Setup (AWS Route 53)

1. In Vercel: Project Settings → Domains → Add `cainmenard.com`
2. In AWS Route 53: Add CNAME record pointing `cainmenard.com` to `cname.vercel-dns.com`
3. Or use Vercel nameservers for full DNS delegation

## Tech Stack

- Next.js 14 (App Router)
- React 18
- Tailwind CSS
- Tableau Public embeds
- Google Fonts (Plus Jakarta Sans, Fraunces)
