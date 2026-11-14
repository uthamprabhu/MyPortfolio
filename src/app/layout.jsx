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

const personJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: site.name,
  url: siteUrl,
  jobTitle: 'Full Stack Developer',
  description: site.description,
  address: { '@type': 'PostalAddress', addressLocality: 'Kochi', addressCountry: 'IN' },
  sameAs: [site.linkedin, site.github],
  knowsAbout: ['React.js', 'Next.js', 'Node.js', 'JavaScript', 'TypeScript', 'MongoDB', 'Three.js', 'AWS', 'GCP'],
}

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={poppins.variable}>
      <body>
        <script
          type="application/ld+json"
          // Static object, no user input: safe to inline.
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd).replace(/</g, '\\u003c') }}
        />
        {children}
        <SpeedInsights />
      </body>
    </html>
  )
}
