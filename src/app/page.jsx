import {
  About, Contact, Experience,
  Hero, Navbar, Tech, Works, StarsCanvas, Resume
} from '../components'
import { site, siteUrl } from '../site'

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

export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        // Static object, no user input: safe to inline.
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd).replace(/</g, '\u003c') }}
      />
      <div className="relative z-0 bg-primary">
        <div className="bg-hero-pattern bg-cover bg-no-repeat bg-center">
          <Navbar />
          <Hero />
        </div>
        <main>
          <About />
          <Experience />
          <Tech />
          <Works />
          <Resume />
          <div className="relative z-0">
            <Contact />
            <StarsCanvas />
          </div>
        </main>
      </div>
    </>
  )
}
