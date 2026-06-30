import { BrowserRouter } from "react-router-dom"
import { SpeedInsights } from "@vercel/speed-insights/react"

import {
  About, Contact, Experience,
  Hero, Navbar, Tech, Works, StarsCanvas, Resume
} from './components'

function App() {
  return (
    <BrowserRouter>
      <div className="relative z-0 bg-primary">
        <div className="bg-hero-pattern bg-cover bg-no-repeat bg-center">
          <Navbar />
          <Hero />
        </div>
        <About />
        <Experience />
        <Tech />
        <Works />
        <Resume />
        <div className="relative z-0">
          <Contact />
          <StarsCanvas />
        </div>
      </div>
      <SpeedInsights />
    </BrowserRouter>
  )
}

export default App
