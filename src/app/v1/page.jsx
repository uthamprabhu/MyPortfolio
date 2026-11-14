import {
  About, Contact, Experience,
  Hero, Navbar, Tech, Works, StarsCanvas, Resume
} from '../../components'

export const metadata = {
  title: 'Older portfolio',
  alternates: { canonical: '/v1' },
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
