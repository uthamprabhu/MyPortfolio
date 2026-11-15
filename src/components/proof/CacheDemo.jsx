'use client'

import { useEffect, useRef, useState } from 'react'

import { TABS, freshVisits, visit } from './proofRules'

const DELAY = 700 // pretend network time, long enough to feel

const Side = ({ label, tab, loading, count }) => (
  <div className="flex-1 min-w-0 border border-[#D9D5CC] bg-[#FAF9F6] rounded-[2px]">
    <p className="px-3 py-2 border-b border-[#D9D5CC] font-mono text-[10px] uppercase tracking-[0.14em] text-[#8A877F]">{label}</p>
    <p className="px-3 h-16 flex items-center text-[14px]" aria-live="polite">
      {loading ? <span className="text-[#8A877F]">Loading…</span> : tab ? `${tab} settings` : <span className="text-[#8A877F]">Pick a tab</span>}
    </p>
    <p className="px-3 py-2 border-t border-[#D9D5CC] font-mono text-[11px] text-[#4A4843]">
      API requests <span className="font-mono text-[15px] text-[#111110]">{count}</span>
    </p>
  </div>
)

// Click the tabs: the left side calls the API every time, the right side only once per tab.
export default function CacheDemo() {
  const [visits, setVisits] = useState(freshVisits)
  const [tab, setTab] = useState(null)
  const [loading, setLoading] = useState({ plain: false, cached: false })
  const timer = useRef(null)

  useEffect(() => () => clearTimeout(timer.current), [])

  const select = (next) => {
    const after = visit(visits, next)
    setVisits(after)
    setTab(next)
    setLoading({ plain: true, cached: !after.hit })
    clearTimeout(timer.current)
    timer.current = setTimeout(() => setLoading({ plain: false, cached: false }), DELAY)
  }

  return (
    <div className="mt-4 max-w-[40rem]">
      <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-[#3A6EA5]">Try it: click around, then go back</p>
      <div className="mt-3 flex flex-wrap gap-1.5">
        {TABS.map((t) => (
          <button
            key={t}
            type="button"
            aria-pressed={tab === t}
            onClick={() => select(t)}
            className={`px-3 py-1.5 rounded-full border text-[13px] transition-colors duration-200
              focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#111110]
              ${tab === t ? 'bg-[#111110] border-[#111110] text-[#F4F2EE]' : 'border-[#D9D5CC] text-[#4A4843] hover:border-[#111110]'}`}
          >
            {t}
          </button>
        ))}
      </div>
      <div className="mt-3 flex flex-col sm:flex-row gap-3">
        <Side label="Before" tab={tab} loading={loading.plain} count={visits.plain} />
        <Side label="After: cached" tab={tab} loading={loading.cached} count={visits.cached} />
      </div>
      <p className="mt-2 font-mono text-[11px] text-[#8A877F]">A simulation of the idea, not the real product.</p>
    </div>
  )
}
