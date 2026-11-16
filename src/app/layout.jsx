import { Poppins } from 'next/font/google'
import { SpeedInsights } from '@vercel/speed-insights/next'

import { site, siteUrl } from '../site'
import './globals.css'

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
  display: 'swap',
  variable: '--font-poppins',
})

export const metadata = {
  metadataBase: new URL(siteUrl),
  title: { default: site.title, template: `%s | ${site.name}` },
  description: site.description,
  applicationName: site.name,
  authors: [{ name: site.name, url: siteUrl }],
  creator: site.name,
  publisher: site.name,
  // Defaults for every route; the home page (app/page.jsx) sets its own full SEO.
  openGraph: { type: 'website', siteName: site.name, locale: 'en_IN' },
  twitter: { card: 'summary_large_image' },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, 'max-image-preview': 'large', 'max-snippet': -1, 'max-video-preview': -1 },
  },
}

export const viewport = {
  themeColor: '#050816',
  colorScheme: 'dark',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={poppins.variable}>
      <body>
        {children}
        <SpeedInsights />
      </body>
    </html>
  )
}
