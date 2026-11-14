'use client'

import { useRef, useState } from 'react'

import GameFrame from './GameFrame'
import { createBugGame } from './bugGame'
import { createStackGame } from './stackGame'

const GAMES = [
  {
    id: 'stack',
    tab: 'Stack',
    title: 'Stack the release',
    how: 'Tap, click or press Space to drop each block. Three perfects in a row widen it again.',
    note: 'Perfect drops build a combo. Misses slice the block.',
    make: createStackGame,
  },
  {
    id: 'bugs',
    tab: 'No bugs',
    title: 'Don’t touch the bug',
    how: 'Swipe or hover through falling code to collect it. Touch a bug and the build breaks.',
    note: 'Chain catches for a combo. debugger; = slow-mo with 2× points. Coffee = extra life.',
    make: createBugGame,
  },
]

// Two mini-games behind tabs; switching tabs pauses the one you leave.
export default function Arcade({ labelClassName = '' }) {
  const [active, setActive] = useState('stack')
  const frames = useRef({})

  const select = (id) => {
    if (id === active) return
    frames.current[active]?.pause()
    setActive(id)
  }

  const current = GAMES.find((g) => g.id === active)

  return (
    <div>
      <div className="flex items-center justify-between gap-4">
        <p className={labelClassName}>
          <span className="text-[#111110]">(03)</span> Arcade
        </p>
        <div role="tablist" aria-label="Choose a game" className="flex items-center gap-1 rounded-full border border-[#D9D5CC] p-0.5">
          {GAMES.map((g) => (
            <button
              key={g.id}
              type="button"
              role="tab"
              id={`tab-${g.id}`}
              aria-selected={active === g.id}
              aria-controls={`panel-${g.id}`}
              onClick={() => select(g.id)}
              className={`rounded-full px-3 py-1 font-mono text-[11px] uppercase tracking-[0.1em] transition-colors duration-200
                focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#111110]
                ${active === g.id ? 'bg-[#111110] text-[#F4F2EE]' : 'text-[#5E5B55] hover:text-[#111110]'}`}
            >
              {g.tab}
            </button>
          ))}
        </div>
      </div>

      <div className="mt-4 h-[340px] sm:h-[300px] lg:h-[clamp(180px,30svh,280px)] rounded-[2px] border border-[#D9D5CC] bg-[#FAF9F6] overflow-hidden">
        {GAMES.map((g) => (
          <div
            key={g.id}
            id={`panel-${g.id}`}
            role="tabpanel"
            aria-labelledby={`tab-${g.id}`}
            hidden={active !== g.id}
            className="w-full h-full"
          >
            <GameFrame
              ref={(api) => { frames.current[g.id] = api }}
              makeGame={g.make}
              title={g.title}
              how={g.how}
            />
          </div>
        ))}
      </div>

      <p className="mt-3 text-[13px] text-[#8A877F] [@media(min-width:1024px)_and_(max-height:760px)]:hidden">
        {current.note}
      </p>
    </div>
  )
}
