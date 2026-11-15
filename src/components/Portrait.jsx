'use client'

import Image from 'next/image'
import { useState } from 'react'

// Formal photo by default; the off-duty one wipes in from the corner badge.
// Mouse: hover (CSS only, see .portrait in globals.css). Touch and keyboard: tap or press to pin it.
export default function Portrait() {
  const [on, setOn] = useState(false)

  return (
    <div className="portrait flex md:flex-col items-end md:items-start gap-4 md:w-[min(100%,352px,43svh)] md:ml-auto" data-on={on}>
      <button
        type="button"
        aria-pressed={on}
        aria-label="Switch between my formal and off-duty photo"
        onClick={() => setOn(!on)}
        className="portrait-frame relative shrink-0 h-28 md:h-auto md:w-full aspect-[4/5] overflow-hidden rounded-[3px] bg-[#D9D5CC] cursor-pointer
          focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#111110]"
      >
        <Image
          src="/assets/me/formal.jpg"
          alt="Utham in a blue checked shirt, formal portrait"
          fill
          priority
          sizes="(min-width: 768px) 352px, 90px"
          className="object-cover"
        />
        <Image
          src="/assets/me/offduty.webp"
          alt="Utham laughing, arms crossed, in a black shirt"
          fill
          loading="eager" // hidden by clip-path, so lazy loading would only start it on first hover
          sizes="(min-width: 768px) 352px, 90px"
          className="portrait-top object-cover object-[62%_40%]"
        />
        <span
          aria-hidden="true"
          className="portrait-badge absolute right-1.5 bottom-1.5 md:right-3 md:bottom-3 w-7 h-7 md:w-9 md:h-9 rounded-full bg-[#F4F2EE] text-[#111110]
            flex items-center justify-center shadow-[0_4px_14px_-4px_rgba(17,17,16,0.5)]"
        >
          <svg viewBox="0 0 24 24" className="w-3.5 h-3.5 md:w-4 md:h-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M4 9h13l-3-3M20 15H7l3 3" />
          </svg>
        </span>
      </button>
      <p className="font-mono text-[11px] uppercase tracking-[0.14em] leading-[1.8] text-[#8A877F]">
        <span className="portrait-a font-mono text-[#111110]">Formal me</span>
        <span className="portrait-b font-mono text-[#3A6EA5]">Off-duty me</span>
        <br />
        <span className="portrait-touch font-mono">Tap the photo</span>
        <span className="portrait-hover font-mono">Hover the photo</span>
      </p>
    </div>
  )
}
