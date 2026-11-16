import {
  About, Contact, Experience,
  Hero, Navbar, Tech, Works, StarsCanvas, Resume
} from '../../components'

// Deprecated, kept only to view: hidden from search so it never competes with the home page.
export const metadata = {
  title: 'Older portfolio',
  robots: { index: false, follow: true },
}

export default function V1() {
  return (
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
  )
}
