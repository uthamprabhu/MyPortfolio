import { siteUrl } from '../site'

// /v1 is left out on purpose: it is noindex (see app/v1/page.jsx).
export default function sitemap() {
  return [
    {
      url: siteUrl,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 1,
      images: [`${siteUrl}/assets/me/formal.jpg`, `${siteUrl}/assets/me/offduty.webp`],
    },
    { url: `${siteUrl}/arcade`, lastModified: new Date(), changeFrequency: 'yearly', priority: 0.3 },
    { url: `${siteUrl}/resume.pdf`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.8 },
  ]
}
