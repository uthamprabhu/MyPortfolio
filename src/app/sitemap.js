import { siteUrl } from '../site'

export default function sitemap() {
  return [
    { url: siteUrl, lastModified: new Date(), changeFrequency: 'monthly', priority: 1 },
    { url: `${siteUrl}/v1`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.9 },
    { url: `${siteUrl}/resume.pdf`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.8 },
  ]
}
