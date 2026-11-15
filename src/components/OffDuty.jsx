'use client'

import { useEffect, useRef, useState } from 'react'

const HOBBIES = [
  {
    id: 'cook',
    word: 'Cooking',
    line: 'These three are how I survived 3+ years in Bengaluru. To be fair, Bengaluru has some amazing food spots too.',
    chips: ['Fried rice', 'Noodles', 'Moradabadi biryani, the hero dish'],
  },
  {
    id: 'swim',
    word: 'Swimming',
    line: 'I was a Kerala state-level swimmer, and I still love jumping into any water body I find.',
  },
  {
    id: 'travel',
    word: 'Travelling',
    line: 'Always up for the next trip. New roads, new food, new people.',
  },
]

// One wave, 5 wavelengths per half so sliding it by 50% loops without a seam.
const WAVE = `M0 10 q15 -9 30 0${' t30 0'.repeat(19)}`

const Fx = {
  cook: () => (
    <svg viewBox="0 0 120 40" className="w-28 h-10 text-[#B98A2F]" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
      {[20, 60, 100].map((x, i) => (
        <path key={x} className="hobby-steam" style={{ animationDelay: `${i * 0.35}s` }} d={`M${x} 38 q-8 -9 0 -18 t0 -18`} />
      ))}
    </svg>
  ),
  swim: () => (
    <div className="w-full max-w-[26rem] h-10 overflow-hidden text-[#3A6EA5]">
      {[0, 1, 2].map((i) => (
        <svg
          key={i}
          viewBox="0 0 600 20"
          preserveAspectRatio="none"
          className="hobby-wave block w-[200%] h-3.5"
          style={{ animationDuration: `${5 + i * 2}s`, opacity: 1 - i * 0.3 }}
          fill="none" stroke="currentColor" strokeWidth="2"
        >
          <path d={WAVE} vectorEffect="non-scaling-stroke" />
        </svg>
      ))}
    </div>
  ),
  travel: () => (
    <svg viewBox="0 0 320 40" className="hobby-route w-full max-w-[26rem] h-10 text-[#4F7A5B]" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
      <circle cx="6" cy="32" r="4" fill="currentColor" stroke="none" />
      <path d="M12 30 C 90 -6, 200 -6, 300 22" strokeDasharray="2 8" />
      <path d="M306 22 l-12 -5 3 5 -3 5 z" fill="currentColor" stroke="none" />
    </svg>
  ),
}

// Mouse: hovering a hobby lights it up. Touch: the hobby crossing the middle of the screen lights up.
// Either way the section's background takes that hobby's colour. All text is readable without it.
export default function OffDuty({ heading }) {
  const [active, setActive] = useState(null)
  const rows = useRef([])

  useEffect(() => {
    if (!window.matchMedia('(hover: none)').matches) return undefined
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          const id = e.target.dataset.id
          setActive((cur) => (e.isIntersecting ? id : cur === id ? null : cur))
        }
      },
      { rootMargin: '-42% 0px -42% 0px' },
    )
    rows.current.forEach((el) => el && io.observe(el))
    return () => io.disconnect()
  }, [])

  return (
    <section aria-labelledby="offduty" className="offduty border-t border-[#D9D5CC] py-12 sm:py-16" data-active={active ?? undefined}>
      <h2 id="offduty">{heading}</h2>
      <ul className="landing-reveal mt-6">
        {HOBBIES.map((h, i) => {
          const Effect = Fx[h.id]
          return (
            <li
              key={h.id}
              ref={(el) => { rows.current[i] = el }}
              data-id={h.id}
              data-on={active === h.id}
              onPointerEnter={(e) => e.pointerType === 'mouse' && setActive(h.id)}
              onPointerLeave={(e) => e.pointerType === 'mouse' && setActive(null)}
              className="hobby grid grid-cols-1 lg:grid-cols-12 gap-x-10 gap-y-3 py-8 sm:py-10 border-b border-[#111110]/10 last:border-b-0"
            >
              <p className="lg:col-span-6 font-semibold tracking-[-0.045em] leading-[0.95] text-[clamp(2.5rem,9vw,5rem)]">
                {h.word}<span className="hobby-dot">.</span>
              </p>
              <div className="lg:col-span-6 flex flex-col justify-center gap-3">
                <div className="hobby-fx h-10" aria-hidden="true"><Effect /></div>
                <p className="max-w-[30rem] text-[16px] sm:text-[17px] leading-[1.6] text-[#4A4843]">{h.line}</p>
                {h.chips && (
                  <ul className="flex flex-wrap gap-2">
                    {h.chips.map((c, n) => (
                      <li
                        key={c}
                        className="hobby-chip px-3 py-1.5 rounded-full border border-[#111110]/25 text-[13px] text-[#111110]"
                        style={{ animationDelay: `${n * 90}ms` }}
                      >
                        {c}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </li>
          )
        })}
      </ul>
    </section>
  )
}
