# Utham N S Prabhu — 3D Portfolio

Next.js 16 (App Router) · React 19 · Three.js (react-three-fiber) · Framer Motion · Tailwind CSS 3

## Run

```bash
npm install
npm run dev     # http://localhost:3000
npm run build && npm start
```

## Environment

Create `.env` (EmailJS keys for the contact form):

```
NEXT_PUBLIC_SERVICE_KEY=...
NEXT_PUBLIC_TEMPLATE_KEY=...
NEXT_PUBLIC_PUBLIC_KEY=...
# optional: canonical URL for metadata/sitemap if you use a custom domain
NEXT_PUBLIC_SITE_URL=https://your-domain.com
```

On Vercel the production URL is picked up automatically when `NEXT_PUBLIC_SITE_URL` is not set.

## Structure

- `src/app` — layout (metadata, fonts), page (JSON-LD), `sitemap.js`, `robots.js`, `icon.svg`
- `src/components` — sections; `canvas/` holds client-only WebGL scenes
- `public/assets` — images; `public/desktop_pc`, `public/planet` — 3D models
