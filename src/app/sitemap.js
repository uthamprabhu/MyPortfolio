import { siteUrl } from '../site'

export default function sitemap() {
  return [
    { url: siteUrl, lastModified: new Date(), changeFrequency: 'monthly', priority: 1 },
    { url: `${siteUrl}/v1`, lastModified: new Date(), changeFrequency: 'yearly', priority: 0.3 },
    { url: `${siteUrl}/arcade`, lastModified: new Date(), changeFrequency: 'yearly', priority: 0.3 },
    { url: `${siteUrl}/resume.pdf`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.8 },
  ]
}
