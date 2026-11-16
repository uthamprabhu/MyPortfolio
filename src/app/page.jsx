import Link from 'next/link'
import { Bricolage_Grotesque, Instrument_Serif } from 'next/font/google'

import OffDuty from '../components/OffDuty'
import Portrait from '../components/Portrait'
import CacheDemo from '../components/proof/CacheDemo'
import GuardDemo from '../components/proof/GuardDemo'
import Scores from '../components/proof/Scores'
import { experience, principles, stack } from '../content'
import { site, siteUrl } from '../site'

const sans = Bricolage_Grotesque({ subsets: ['latin'], display: 'swap', variable: '--font-landing' })
const serif = Instrument_Serif({ subsets: ['latin'], weight: '400', style: 'italic', display: 'swap' })

// The share image comes from app/opengraph-image.jsx and is added to og:image / twitter:image automatically.
export const metadata = {
  title: { absolute: site.title },
  description: site.description,
  keywords: [
    'Utham N S Prabhu', 'Utham Prabhu', 'Frontend Engineer', 'Frontend Developer', 'React Developer',
    'Next.js Developer', 'TypeScript Developer', 'Full Stack Developer', 'Frontend Engineer Bengaluru',
    'React Developer Bengaluru', 'Hire Frontend Developer India', 'Portfolio',
  ],
  alternates: { canonical: '/' },
  openGraph: {
    type: 'profile',
    url: '/',
    siteName: site.name,
    title: site.title,
    description: site.description,
    locale: 'en_IN',
    firstName: 'Utham',
    lastName: 'Prabhu',
    username: 'uthamprabhu',
  },
  twitter: { card: 'summary_large_image', title: site.title, description: site.description },
}

export const viewport = {
  themeColor: '#F4F2EE',
  colorScheme: 'light',
}

const id = (frag) => `${siteUrl}/#${frag}`
const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'WebSite',
      '@id': id('website'),
      url: siteUrl,
      name: site.name,
      inLanguage: 'en',
      publisher: { '@id': id('person') },
    },
    {
      '@type': 'ProfilePage',
      '@id': id('profile'),
      url: siteUrl,
      name: site.title,
      description: site.description,
      inLanguage: 'en',
      isPartOf: { '@id': id('website') },
      mainEntity: { '@id': id('person') },
      primaryImageOfPage: { '@id': id('photo') },
    },
    {
      '@type': 'Person',
      '@id': id('person'),
      name: site.name,
      alternateName: ['Utham Prabhu', 'Utham N S'],
      givenName: 'Utham',
      familyName: 'Prabhu',
      url: siteUrl,
      image: {
        '@type': 'ImageObject',
        '@id': id('photo'),
        url: `${siteUrl}/assets/me/formal.jpg`,
        width: 413,
        height: 413,
        caption: `${site.name}, ${site.role}`,
      },
      jobTitle: site.role,
      description: site.description,
      email: `mailto:${site.email}`,
      address: { '@type': 'PostalAddress', addressLocality: site.city, addressRegion: 'Karnataka', addressCountry: 'IN' },
      hasOccupation: {
        '@type': 'Occupation',
        name: site.role,
        occupationLocation: { '@type': 'City', name: site.city },
        skills: stack.map(([, tools]) => tools).join(', '),
      },
      knowsAbout: ['React', 'Next.js', 'TypeScript', 'JavaScript', 'Node.js', 'PostgreSQL', 'MongoDB', 'GraphQL', 'AWS', 'Web performance', 'Core Web Vitals'],
      sameAs: [site.linkedin, site.github],
    },
  ],
}

const links = [
  { label: 'Email', href: `mailto:${site.email}` },
  { label: 'LinkedIn', href: site.linkedin },
  { label: 'GitHub', href: site.github },
  { label: 'Résumé', href: '/resume.pdf' },
]

const focusRing =
  'focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#111110]'
const mono = 'font-mono text-[11px] uppercase tracking-[0.14em]'
const shell = 'max-w-[1200px] mx-auto px-6 sm:px-10 lg:px-16'
const Label = ({ n, children }) => (
  <p className={`${mono} text-[#8A877F]`}>
    <span className="text-[#111110]">({n})</span> {children}
  </p>
)

// Opens the contact popover. `popoverTarget` is native HTML, so this needs no JavaScript.
const HireButton = ({ children }) => (
  <button
    type="button"
    popoverTarget="contact"
    className={`group inline-flex items-center justify-center gap-3 bg-[#111110] text-[#F4F2EE] text-[15px] font-medium
      pl-7 pr-6 py-4 rounded-full transition-colors duration-300 hover:bg-[#3A6EA5] ${focusRing}`}
  >
    {children}
    <span aria-hidden="true" className="transition-transform duration-300 group-hover:translate-x-1">→</span>
  </button>
)

const contacts = [
  ['WhatsApp', 'Message me', `${site.whatsapp}?text=${encodeURIComponent('Hi Utham, I just saw your site.')}`],
  ['Email', site.email, `mailto:${site.email}`],
  ['Phone', site.phone, `tel:${site.phone.replace(/\s/g, '')}`],
  ['LinkedIn', 'linkedin.com/in/uthamprabhu', site.linkedin],
]

const Details = ({ lines, label = 'What I did' }) => (
  <details className="mt-3">
    <summary className={`${mono} w-fit cursor-pointer text-[#5E5B55] hover:text-[#111110] rounded-sm ${focusRing}`}>{label}</summary>
    <ul className="mt-3 border-l-2 border-[#3A6EA5] pl-4 space-y-1.5 text-[12px] leading-[1.6] text-[#4A4843]">
      {/* globals.css sets font-family on `*`, so the mono class has to sit on the li itself */}
      {lines.map((line) => <li key={line} className="font-mono">{line}</li>)}
    </ul>
  </details>
)

export default function Home() {
  return (
    <div className={`landing ${sans.variable} min-h-[100svh] bg-[#F4F2EE] text-[#111110]`}>
      <script
        type="application/ld+json"
        // Static object, no user input: safe to inline.
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, '\\u003c') }}
      />
      <header className="sticky top-0 z-10 border-b border-[#D9D5CC] bg-[#F4F2EE]/90 backdrop-blur-sm">
        <div className={`${shell} h-16 flex items-center justify-between gap-4`}>
          <span className="text-[13px] font-semibold tracking-[-0.01em] whitespace-nowrap">{site.name}</span>
          <span className={`${mono} flex items-center gap-2 text-[#5E5B55] whitespace-nowrap`}>
            <span className="landing-dot w-1.5 h-1.5 rounded-full bg-[#3A6EA5]" aria-hidden="true" />
            Open to work
          </span>
        </div>
      </header>

      <main className={shell}>
        {/* Hero fits one screen: 4rem is the sticky header, type and gaps scale with the viewport height */}
        <section className="min-h-[calc(100svh-4rem)] py-6 md:py-8 grid grid-cols-1 md:grid-cols-12 content-center md:items-center gap-y-5 md:gap-x-10">
          <div className="landing-fade md:col-span-5 md:order-last" style={{ '--d': '200ms' }}>
            <Portrait />
          </div>
          <div className="md:col-span-7">
            <div className="landing-rise" style={{ '--d': '0ms' }}>
              <Label n="01">Now</Label>
            </div>
            <h1
              className="landing-rise-solid mt-[clamp(0.9rem,3svh,2rem)] font-semibold tracking-[-0.045em] leading-[0.95]
                text-[clamp(2rem,min(10.2vw,9.5svh),4.4rem)] md:text-[clamp(2rem,min(5.6vw,9.5svh),4.4rem)]"
              style={{ '--d': '80ms' }}
            >
              I build the bit
              <br />
              you click on<span className="text-[#3A6EA5]">.</span>
              <span className={`${serif.className} block font-normal tracking-[-0.02em] text-[0.82em] text-[#8A877F] mt-1`}>
                and it loads fast. promise.
              </span>
            </h1>
            <p
              className="landing-rise mt-[clamp(0.9rem,3svh,2rem)] max-w-[34rem] text-[15px] sm:text-[17px] leading-[1.6] text-[#4A4843]"
              style={{ '--d': '160ms' }}
            >
              I&apos;m Utham, a frontend engineer in {site.city}. I take features from a Figma file to
              production in React, Next.js and TypeScript, and I&apos;m at home when the work
              crosses into Node.js, PostgreSQL and AWS.
            </p>
            <p
              className={`landing-rise mt-[clamp(0.9rem,3svh,2rem)] ${mono} text-[#8A877F] hidden sm:block [@media(max-height:700px)]:hidden`}
              style={{ '--d': '240ms' }}
            >
              Immediate joiner ·{' '}
              <a href="#try-cache" className={`landing-link font-mono text-[#3A6EA5] rounded-sm ${focusRing}`}>
                Don&apos;t take my word for it, play with my work <span aria-hidden="true">↓</span>
              </a>
            </p>
            <div className="landing-rise mt-[clamp(0.9rem,3svh,2rem)]" style={{ '--d': '320ms' }}>
              <HireButton>Make Utham part of your team</HireButton>
            </div>
          </div>
        </section>

        <section aria-labelledby="how" className="border-t border-[#D9D5CC] py-12 sm:py-16">
          <Label n="02">How I work</Label>
          <h2 id="how" className="landing-reveal mt-6 max-w-[20ch] font-semibold tracking-[-0.04em] leading-[1.02] text-[clamp(2rem,5vw,3.5rem)]">
            I take a problem and stay with it until it&apos;s actually solved<span className="text-[#3A6EA5]">.</span>
          </h2>
          <ol className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-x-10">
            {principles.map((p, i) => (
              <li key={p.title} className="landing-reveal py-7 border-t border-[#D9D5CC]">
                <p className="font-mono text-[13px] text-[#3A6EA5]">0{i + 1}</p>
                <h3 className="mt-2 text-[22px] font-semibold tracking-[-0.03em] leading-tight">{p.title}</h3>
                <p className="mt-3 max-w-[32rem] text-[16px] leading-[1.6] text-[#4A4843]">{p.body}</p>
                <p className={`mt-4 ${mono} text-[#8A877F]`}>{p.source}</p>
              </li>
            ))}
          </ol>
        </section>

        <section aria-labelledby="experience" className="border-t border-[#D9D5CC] py-12 sm:py-16">
          <h2 id="experience"><Label n="03">Experience</Label></h2>
          <ol className="mt-4">
            {experience.map((r) => (
              <li key={r.name} className="landing-reveal grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-10 py-10 border-b border-[#D9D5CC] last:border-b-0">
                <div className="lg:col-span-4">
                  <p className="font-mono text-[13px] text-[#3A6EA5]">{r.period}</p>
                  <h3 className="mt-1 text-[26px] font-semibold tracking-[-0.03em] leading-tight">{r.name}</h3>
                  <p className={`mt-3 ${mono} text-[#8A877F] leading-[1.8]`}>
                    {r.role}
                    <br />
                    {r.where}
                  </p>
                </div>
                <ul className="lg:col-span-8 flex flex-col gap-8">
                  {r.items.map((item) => (
                    <li key={item.title} id={item.demo && `try-${item.demo}`} className="scroll-mt-24">
                      <p className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                        {item.href ? (
                          <a
                            href={item.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            className={`landing-link text-[17px] font-semibold tracking-[-0.01em] rounded-sm ${focusRing}`}
                          >
                            {item.title} <span aria-hidden="true">↗</span>
                          </a>
                        ) : (
                          <span className="text-[17px] font-semibold tracking-[-0.01em]">{item.title}</span>
                        )}
                        <span className={`${mono} ${item.wip ? 'text-[#3A6EA5]' : 'text-[#8A877F]'}`}>
                          {item.wip && <span className="landing-dot inline-block w-1.5 h-1.5 mr-2 rounded-full bg-[#3A6EA5] align-middle" aria-hidden="true" />}
                          {item.kind}
                        </span>
                      </p>
                      <p className="mt-2 max-w-[40rem] text-[16px] leading-[1.6] text-[#4A4843]">{item.claim}</p>
                      {item.scores && <Scores scores={item.scores} note={item.scoresNote} />}
                      {item.demo === 'cache' && <CacheDemo />}
                      {item.demo === 'guard' && <GuardDemo />}
                      {item.details && <Details lines={item.details} label={item.detailsLabel} />}
                    </li>
                  ))}
                </ul>
              </li>
            ))}
          </ol>
        </section>

        <section aria-labelledby="stack" className="border-t border-[#D9D5CC] py-12 sm:py-16">
          <h2 id="stack"><Label n="04">Stack</Label></h2>
          <dl className="landing-reveal mt-8 grid grid-cols-1 lg:grid-cols-12 gap-x-10 gap-y-5">
            {stack.map(([name, tools]) => (
              <div key={name} className="contents">
                <dt className={`lg:col-span-4 ${mono} text-[#8A877F] lg:pt-1`}>{name}</dt>
                <dd className="lg:col-span-8 text-[16px] leading-[1.6] text-[#4A4843]">{tools}</dd>
              </div>
            ))}
          </dl>
        </section>

        <OffDuty heading={<Label n="05">Off the clock</Label>} />

        <section aria-labelledby="archive" className="border-t border-[#D9D5CC] py-12 sm:py-16">
          <h2 id="archive"><Label n="06">Archive</Label></h2>
          <ul className="landing-reveal mt-8 flex flex-col sm:flex-row gap-4 sm:gap-10 text-[16px]">
            <li>
              <Link href="/v1" className={`landing-link rounded-sm ${focusRing}`}>The old 3D site</Link>
              <span className={`ml-3 ${mono} text-[#8A877F]`}>deprecated</span>
            </li>
            <li>
              <Link href="/arcade" className={`landing-link rounded-sm ${focusRing}`}>Arcade</Link>
              <span className={`ml-3 ${mono} text-[#8A877F]`}>two small games</span>
            </li>
          </ul>
        </section>

        <section aria-labelledby="hire" className="border-t border-[#D9D5CC] py-16 sm:py-24">
          <Label n="07">Contact</Label>
          <h2 id="hire" className="landing-reveal mt-6 max-w-[18ch] font-semibold tracking-[-0.04em] leading-[1] text-[clamp(2.25rem,6vw,4.25rem)]">
            Make Utham part of your development team<span className="text-[#3A6EA5]">.</span>
          </h2>
          <p className="mt-6 max-w-[34rem] text-[16px] sm:text-[17px] leading-[1.65] text-[#4A4843]">
            Remote anywhere in the world, any time zone, or hybrid and on-site in India. I can start right away.
          </p>
          <div className="mt-8">
            <HireButton>Contact me</HireButton>
          </div>
        </section>
      </main>

      {/* Native popover: Esc and click-outside close it. The inner div holds the layout so the
          browser's own display:none for a closed popover is never overridden. */}
      <div
        id="contact"
        popover="auto"
        aria-labelledby="contact-title"
        className="m-auto w-[min(92vw,28rem)] bg-[#FAF9F6] text-[#111110] border border-[#D9D5CC] rounded-[3px]
          shadow-[0_30px_80px_-20px_rgba(17,17,16,0.45)] backdrop:bg-[#111110]/45 backdrop:backdrop-blur-[3px]"
      >
        <div className="p-6 sm:p-8">
          <div className="flex items-start justify-between gap-4">
            <h2 id="contact-title" className="text-[22px] font-semibold tracking-[-0.03em] leading-tight">
              Let&apos;s talk<span className="text-[#3A6EA5]">.</span>
            </h2>
            <button
              type="button"
              popoverTarget="contact"
              popoverTargetAction="hide"
              aria-label="Close"
              className={`w-8 h-8 -mt-1 -mr-2 inline-flex items-center justify-center rounded-full text-[18px] leading-none
                hover:bg-[#111110] hover:text-[#F4F2EE] transition-colors ${focusRing}`}
            >
              ×
            </button>
          </div>
          <p className="mt-2 text-[14px] leading-[1.6] text-[#5E5B55]">Pick whichever is easiest for you.</p>
          <ul className="mt-5 border-t border-[#D9D5CC]">
            {contacts.map(([label, value, href]) => (
              <li key={label} className="border-b border-[#D9D5CC]">
                <a
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`group flex items-baseline justify-between gap-4 py-4 rounded-sm ${focusRing}`}
                >
                  <span className={`${mono} text-[#8A877F]`}>{label}</span>
                  <span className="text-[15px] font-medium text-right break-all group-hover:text-[#3A6EA5] transition-colors">{value}</span>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <footer className="border-t border-[#D9D5CC]">
        <div className={`${shell} py-6 flex flex-col sm:flex-row gap-4 sm:items-center sm:justify-between text-[14px]`}>
          <nav aria-label="Contact" className="flex flex-wrap gap-x-7 gap-y-2">
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
          <span className={`${mono} text-[#8A877F]`}>{site.role} — {site.city}, IN</span>
        </div>
      </footer>

      <a
        href={`${site.whatsapp}?text=${encodeURIComponent('Hi Utham, I just saw your site.')}`}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat with me on WhatsApp"
        title="Chat on WhatsApp"
        className="fixed bottom-5 right-5 z-20 w-14 h-14 rounded-full bg-[#25D366] text-white flex items-center justify-center
          shadow-[0_10px_30px_-8px_rgba(17,17,16,0.45)] transition-transform duration-200 hover:scale-105
          focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#111110]"
      >
        <svg viewBox="0 0 24 24" className="w-7 h-7" fill="currentColor" aria-hidden="true">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
        </svg>
      </a>
    </div>
  )
}
