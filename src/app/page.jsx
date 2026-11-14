import Link from 'next/link'

import { site } from '../site'

const links = [
  { label: 'LinkedIn', href: site.linkedin },
  { label: 'GitHub', href: site.github },
  { label: 'Resume', href: '/resume.pdf' },
]

export default function Home() {
  return (
    <main className="min-h-screen bg-black text-white flex flex-col">
      <header className="px-6 sm:px-16 py-6 flex items-center justify-between text-[13px] tracking-wider uppercase">
        <span className="font-semibold">{site.name}</span>
        <span className="text-white/50 font-mono">v2 / under construction</span>
      </header>

      <section className="flex-1 flex items-center px-6 sm:px-16">
        <div className="max-w-3xl w-full">
          <p className="font-mono text-[13px] text-white/50 mb-6">
            $ npm run build-new-portfolio<span className="landing-cursor" aria-hidden="true">_</span>
          </p>

          <h1 className="font-black leading-[1.05] text-[44px] sm:text-[72px] lg:text-[88px]">
            New site loading.
            <br />
            <span className="text-white/40">Slowly. Deliberately.</span>
          </h1>

          <p className="mt-8 text-white/70 text-[16px] sm:text-[18px] leading-relaxed max-w-xl">
            I&apos;m rebuilding this from scratch. Meanwhile, the current version still works
            perfectly well. It has a 3D computer, and it&apos;s very proud of it.
          </p>

          <div className="mt-10 max-w-md" role="img" aria-label="Build progress: 99 percent">
            <div className="flex justify-between font-mono text-[12px] text-white/50 mb-2">
              <span>progress</span>
              <span>99%</span>
            </div>
            <div className="h-[2px] w-full bg-white/15 overflow-hidden">
              <div className="landing-bar h-full bg-white" />
            </div>
            <p className="mt-2 font-mono text-[12px] text-white/40">
              The last 1% takes the other 90% of the time.
            </p>
          </div>

          <div className="mt-12 flex flex-col sm:flex-row gap-4 sm:items-center">
            <Link
              href="/v1"
              className="inline-flex items-center justify-center gap-2 bg-white text-black font-semibold
                px-7 py-4 rounded-full transition-transform duration-200 hover:-translate-y-0.5
                focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
            >
              Visit the current site <span aria-hidden="true">→</span>
            </Link>
            <span className="text-white/40 text-[14px]">or come back when the paint dries.</span>
          </div>
        </div>
      </section>

      <footer className="px-6 sm:px-16 py-6 flex flex-wrap gap-x-8 gap-y-2 text-[14px] text-white/60 border-t border-white/10">
        {links.map((l) => (
          <a
            key={l.label}
            href={l.href}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-white transition-colors"
          >
            {l.label}
          </a>
        ))}
        <span className="sm:ml-auto text-white/30">Full Stack Developer · Kochi</span>
      </footer>
    </main>
  )
}
