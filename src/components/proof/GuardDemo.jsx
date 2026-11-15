'use client'

import { useState } from 'react'

import { ROUTES, canOpen } from './proofRules'

const ring = 'focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#111110]'

const MESSAGES = {
  open: (r) => [`${r.title} opened`, r.open ? 'This one is yours to see.' : 'Nothing checked who you are.'],
  blocked: (r) => [`403 · ${r.title} stays shut`, 'The server checked your role before the page was built.'],
  missing: () => ['404', 'No such page. Try one of the suggestions.'],
}

// A fake address bar: you are a regular employee, type a URL you should not be able to open.
export default function GuardDemo() {
  const [guarded, setGuarded] = useState(false)
  const [path, setPath] = useState('/hr/payroll')
  const [visited, setVisited] = useState(null)

  const outcome = visited === null ? null : canOpen(visited, guarded)
  const [headline, note] = outcome ? MESSAGES[outcome.result](outcome.route) : ['Signed in as a regular employee', 'Type a URL you should not be able to open, then press Go.']
  const bad = outcome?.result === 'open' && !outcome.route.open

  return (
    <div className="mt-4 max-w-[40rem]">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-[#3A6EA5]">Try it: break in</p>
        <div className="flex rounded-full border border-[#D9D5CC] p-0.5" role="group" aria-label="Version of the app">
          {[['Before', false], ['After my fix', true]].map(([label, value]) => (
            <button
              key={label}
              type="button"
              aria-pressed={guarded === value}
              onClick={() => setGuarded(value)}
              className={`px-3 py-1 rounded-full font-mono text-[11px] uppercase tracking-[0.1em] transition-colors duration-200 ${ring}
                ${guarded === value ? 'bg-[#111110] text-[#F4F2EE]' : 'text-[#5E5B55] hover:text-[#111110]'}`}
            >
              {label}
            </button>
          ))}
        </div>
      </div>

      <form
        className="mt-3 flex border border-[#D9D5CC] bg-[#FAF9F6] rounded-[2px]"
        onSubmit={(e) => { e.preventDefault(); setVisited(path) }}
      >
        <label className="flex-1 min-w-0 flex items-center">
          <span className="pl-3 font-mono text-[13px] text-[#8A877F]">scotty</span>
          <span className="sr-only">Page address</span>
          <input
            value={path}
            onChange={(e) => setPath(e.target.value)}
            spellCheck={false}
            autoCapitalize="none"
            className="flex-1 min-w-0 bg-transparent py-2.5 pr-3 font-mono text-[13px] text-[#111110] outline-none"
          />
        </label>
        <button type="submit" className={`px-4 border-l border-[#D9D5CC] text-[13px] font-medium hover:bg-[#111110] hover:text-[#F4F2EE] transition-colors ${ring}`}>
          Go
        </button>
      </form>

      <div className="mt-2 flex flex-wrap gap-x-4 gap-y-1">
        {ROUTES.map((r) => (
          <button
            key={r.path}
            type="button"
            onClick={() => { setPath(r.path); setVisited(r.path) }}
            className={`landing-link font-mono text-[12px] text-[#5E5B55] hover:text-[#111110] rounded-sm ${ring}`}
          >
            {r.path}
          </button>
        ))}
      </div>

      <div
        aria-live="polite"
        className={`mt-3 px-3 py-3 border-l-2 bg-[#FAF9F6] ${bad ? 'border-[#B4372B]' : 'border-[#3A6EA5]'}`}
      >
        <p className={`text-[15px] font-semibold ${bad ? 'text-[#B4372B]' : 'text-[#111110]'}`}>{headline}</p>
        <p className="mt-0.5 text-[13px] text-[#5E5B55]">{note}</p>
      </div>
      <p className="mt-2 font-mono text-[11px] text-[#8A877F]">A simulation of the idea, not the real product.</p>
    </div>
  )
}
