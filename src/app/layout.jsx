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
  keywords: [
    'Utham N S Prabhu', 'Utham Prabhu', 'Full Stack Developer', 'React Developer',
    'Next.js Developer', 'Node.js Developer', 'Frontend Developer', 'Kochi', 'Bengaluru', 'Portfolio',
  ],
  alternates: { canonical: '/' },
  openGraph: {
    type: 'profile',
    url: '/',
    siteName: site.name,
    title: site.title,
    description: site.description,
    locale: 'en_IN',
  },
  twitter: { card: 'summary_large_image', title: site.title, description: site.description },
  robots: { index: true, follow: true },
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
