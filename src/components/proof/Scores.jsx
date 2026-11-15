'use client'

import { useState } from 'react'

const C = 126 // circumference of r=20, rounded
const colour = (v) => (v < 50 ? '#B4372B' : v < 90 ? '#B98A2F' : '#3A6EA5') // Lighthouse's own three bands

// scores: [name, after, before?]. With "before" numbers a slider lets you drag from where the site
// started to where it ended; without them the rings just draw themselves once.
export default function Scores({ scores, note }) {
  const playable = scores.every(([, , before]) => typeof before === 'number')
  const [t, setT] = useState(100)

  return (
    <div className="mt-4 max-w-[40rem]">
      <ul className="flex flex-wrap gap-x-7 gap-y-4" aria-label="Lighthouse scores">
        {scores.map(([name, after, before]) => {
          const value = playable ? Math.round(before + ((after - before) * t) / 100) : after
          return (
            <li key={name} className="flex items-center gap-3">
              <svg viewBox="0 0 48 48" className="w-12 h-12 -rotate-90" aria-hidden="true">
                <circle cx="24" cy="24" r="20" fill="none" stroke="#D9D5CC" strokeWidth="3" />
                <circle
                  cx="24" cy="24" r="20" fill="none" stroke={colour(value)} strokeWidth="3" strokeLinecap="round"
                  strokeDasharray={C} className={playable ? undefined : 'landing-ring'}
                  style={playable ? { strokeDashoffset: C - (C * value) / 100 } : { '--o': C - (C * value) / 100 }}
                />
              </svg>
              <span>
                <span className="block font-mono text-[18px] leading-none tabular-nums" style={{ color: playable ? colour(value) : '#111110' }}>{value}</span>
                <span className="block mt-1 font-mono text-[10px] uppercase tracking-[0.14em] text-[#8A877F]">
                  {name}
                  {/* how far this score has climbed from where it started */}
                  {playable && value > before && <span className="font-mono text-[#3A6EA5]"> +{value - before}</span>}
                </span>
              </span>
            </li>
          )
        })}
      </ul>

      {playable && (
        <label className="mt-5 block">
          <span className="flex justify-between font-mono text-[11px] uppercase tracking-[0.14em] text-[#8A877F]">
            <span>Where it started</span>
            <span className="font-mono text-[#3A6EA5]">Try it: drag</span>
            <span>Where I left it</span>
          </span>
          <input
            type="range" min="0" max="100" value={t}
            onChange={(e) => setT(Number(e.target.value))}
            aria-label="Slide between the scores before and after my work"
            aria-valuetext={t === 0 ? 'Before' : t === 100 ? 'After' : `${t}% of the way`}
            className="mt-2 w-full accent-[#3A6EA5] cursor-ew-resize"
          />
          {note && <span className="mt-1 block font-mono text-[11px] text-[#8A877F]">{note}</span>}
        </label>
      )}
    </div>
  )
}
