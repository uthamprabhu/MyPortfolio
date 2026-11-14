import Link from 'next/link'
import { Instrument_Serif } from 'next/font/google'

import StackGame from '../components/landing/StackGame'
import { site } from '../site'

const serif = Instrument_Serif({ subsets: ['latin'], weight: '400', style: 'italic', display: 'swap' })

export const viewport = {
  themeColor: '#F4F2EE',
  colorScheme: 'light',
}

const links = [
  { label: 'LinkedIn', href: site.linkedin },
  { label: 'GitHub', href: site.github },
  { label: 'Résumé', href: '/resume.pdf' },
]

const focusRing =
  'focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#111110]'

const Label = ({ n, children }) => (
  <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-[#8A877F]">
    <span className="text-[#111110]">({n})</span> {children}
  </p>
)

export default function Home() {
  return (
    <div className="landing min-h-[100svh] bg-[#F4F2EE] text-[#111110] flex flex-col">
      <header className="border-b border-[#D9D5CC]">
        <div className="max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-16 h-16 flex items-center justify-between gap-4">
          <span className="text-[13px] font-semibold tracking-[-0.01em] whitespace-nowrap">{site.name}</span>
          <span className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.14em] text-[#5E5B55] whitespace-nowrap">
            <span className="landing-dot w-1.5 h-1.5 rounded-full bg-[#FF4F00]" aria-hidden="true" />
            <span className="hidden sm:inline">Version 2 — in progress</span>
            <span className="sm:hidden">v2 in progress</span>
          </span>
        </div>
      </header>

      <main className="flex-1 flex">
        <div className="w-full max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-16 py-10 sm:py-14 lg:py-0 grid grid-cols-1 lg:grid-cols-12 gap-14 lg:gap-0">
          {/* Left: statement */}
          <section className="lg:col-span-6 xl:col-span-7 lg:pr-12 xl:pr-16 lg:py-6 xl:py-10 2xl:py-14 flex flex-col justify-center">
            <div className="landing-rise" style={{ '--d': '0ms' }}>
              <Label n="01">Status</Label>
            </div>

            <h1
              className="landing-rise-solid mt-6 font-semibold tracking-[-0.045em] leading-[0.95] text-[clamp(2.75rem,min(11vw,10svh),6.25rem)]"
              style={{ '--d': '80ms' }}
            >
              New site
              <br />
              loading<span className="text-[#FF4F00]">.</span>
              <span className={`${serif.className} block font-normal tracking-[-0.02em] text-[#8A877F] mt-1`}>
                slowly, deliberately.
              </span>
            </h1>

            <p
              className="landing-rise mt-8 max-w-[34rem] text-[16px] sm:text-[17px] leading-[1.65] text-[#4A4843]"
              style={{ '--d': '160ms' }}
            >
              I&apos;m rebuilding this from scratch. Meanwhile, the current version still works
              perfectly well. It has a 3D computer, and it&apos;s very proud of it.
            </p>

            <div className="landing-rise mt-10 flex flex-col sm:flex-row gap-4 sm:gap-7 sm:items-center" style={{ '--d': '240ms' }}>
              <Link
                href="/v1"
                className={`group inline-flex items-center justify-center gap-3 bg-[#111110] text-[#F4F2EE]
                  text-[15px] font-medium pl-7 pr-6 py-4 rounded-full transition-colors duration-300
                  hover:bg-[#FF4F00] ${focusRing}`}
              >
                Visit the current site
                <span aria-hidden="true" className="transition-transform duration-300 group-hover:translate-x-1">→</span>
              </Link>
              <span className="hidden lg:inline text-[14px] text-[#8A877F]">
                or come back when the paint dries.
              </span>
              <a
                href="#game"
                className={`lg:hidden inline-flex items-center justify-center gap-2 border border-[#111110] text-[#111110]
                  text-[15px] font-medium px-7 py-4 rounded-full transition-colors duration-300
                  hover:bg-[#111110] hover:text-[#F4F2EE] ${focusRing}`}
              >
                Or play a quick game <span aria-hidden="true">↓</span>
              </a>
            </div>
          </section>

          {/* Right: progress + game */}
          <aside className="lg:col-span-6 xl:col-span-5 lg:border-l lg:border-[#D9D5CC] lg:pl-12 xl:pl-16 lg:py-6 xl:py-10 2xl:py-14 flex flex-col justify-center gap-10 xl:gap-12">
            <div className="landing-rise order-2 lg:order-1" style={{ '--d': '320ms' }} role="img" aria-label="Build progress: 99 percent">
              <div className="flex items-end justify-between">
                <Label n="02">Progress</Label>
                <span className="font-semibold tracking-[-0.04em] text-[44px] leading-none">
                  99<span className="text-[#8A877F] text-[24px] align-top">%</span>
                </span>
              </div>
              <div className="mt-4 h-px w-full bg-[#D9D5CC]">
                <div className="landing-bar h-full bg-[#111110]" />
              </div>
              <p className="mt-3 text-[13px] text-[#8A877F] [@media(min-width:1024px)_and_(max-height:760px)]:hidden">The last 1% takes the other 90% of the time.</p>
            </div>

            <div id="game" className="landing-rise order-1 lg:order-2 scroll-mt-6" style={{ '--d': '400ms' }}>
              <div className="flex items-center justify-between gap-4">
                <Label n="03">Stack the release</Label>
                <span className="font-mono text-[11px] uppercase tracking-[0.14em] text-[#8A877F] whitespace-nowrap">
                  <span className="hidden sm:inline">Click / Space</span>
                  <span className="sm:hidden">Tap</span>
                </span>
              </div>
              <div className="mt-4 h-[340px] sm:h-[300px] lg:h-[clamp(180px,30svh,280px)] rounded-[2px] border border-[#D9D5CC] bg-[#FAF9F6]">
                <StackGame />
              </div>
              <p className="mt-3 text-[13px] text-[#8A877F] [@media(min-width:1024px)_and_(max-height:760px)]:hidden">
                Perfect drops build a combo. Three in a row widens the block again.
              </p>
            </div>
          </aside>
        </div>
      </main>

      <footer className="border-t border-[#D9D5CC]">
        <div className="max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-16 py-5 flex flex-col sm:flex-row gap-3 sm:items-center sm:justify-between text-[14px]">
          <nav aria-label="Profiles" className="flex gap-7">
            {links.map((l) => (
              <a
                key={l.label}
                href={l.href}
                target="_blank"
                rel="noopener noreferrer"
                className={`landing-link text-[#4A4843] hover:text-[#111110] rounded-sm ${focusRing}`}
              >
                {l.label}
              </a>
            ))}
          </nav>
          <span className="font-mono text-[11px] uppercase tracking-[0.14em] text-[#8A877F]">
            Full Stack Developer — Kochi, IN
          </span>
        </div>
      </footer>
    </div>
  )
}
