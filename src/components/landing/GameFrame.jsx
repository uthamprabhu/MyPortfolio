'use client'

import { useEffect, useImperativeHandle, useRef, useState } from 'react'
import { flushSync } from 'react-dom'

import { runEngine } from './engineKit'

const MODAL_QUERY = '(min-width: 768px)'

// Canvas + Play / Resume / Retry overlay. Games never start on their own.
// On tablet and desktop the same canvas expands into a modal while playing (no remount, so state survives).
export default function GameFrame({ ref, makeGame, title, how }) {
  const canvasRef = useRef(null)
  const engineRef = useRef(null)
  const closeRef = useRef(null)
  const [status, setStatus] = useState('idle') // idle | playing | paused | over
  const [result, setResult] = useState(null)
  const [expanded, setExpanded] = useState(false)
  const [playedInModal, setPlayedInModal] = useState(false)

  useEffect(() => {
    const engine = runEngine(canvasRef.current, makeGame(), {
      onOver: (r) => { setResult(r); setStatus('over') },
      onAutoPause: () => setStatus('paused'),
    })
    engineRef.current = engine
    return () => engine.destroy()
  }, [makeGame])

  const close = () => {
    if (engineRef.current?.playing()) {
      engineRef.current.pause()
      setStatus('paused')
    }
    setExpanded(false)
  }

  useImperativeHandle(ref, () => ({ pause: close }), [])

  // Modal: lock page scroll and close on Escape
  useEffect(() => {
    if (!expanded) return undefined
    const root = document.documentElement
    const prev = root.style.overflow
    root.style.overflow = 'hidden'
    const onKey = (e) => { if (e.key === 'Escape') close() }
    window.addEventListener('keydown', onKey)
    return () => {
      root.style.overflow = prev
      window.removeEventListener('keydown', onKey)
    }
  }, [expanded])

  const play = () => {
    const engine = engineRef.current
    if (!expanded && window.matchMedia(MODAL_QUERY).matches) {
      flushSync(() => { setExpanded(true); setPlayedInModal(true) })
    }
    if (status === 'paused') engine.resume()
    else engine.start()
    setStatus('playing')
    canvasRef.current.focus({ preventScroll: true })
  }

  const action = status === 'paused' ? 'Resume' : status === 'over' ? 'Retry' : 'Play'

  return (
    <div className="relative w-full h-full">
      {expanded && (
        <div className="absolute inset-0 flex items-center justify-center font-mono text-[11px] uppercase tracking-[0.14em] text-[#8A877F]">
          Playing in a window…
        </div>
      )}

      <div
        className={expanded
          ? 'landing-modal fixed inset-0 z-50 flex items-center justify-center bg-[#111110]/45 backdrop-blur-[3px] p-4 sm:p-8'
          : 'contents'}
        onPointerDown={expanded ? (e) => { if (e.target === e.currentTarget) close() } : undefined}
      >
        <div
          role={expanded ? 'dialog' : undefined}
          aria-modal={expanded || undefined}
          aria-label={expanded ? title : undefined}
          className={expanded
            ? 'landing-modal-card relative flex flex-col w-[min(1040px,94vw)] h-[min(720px,86svh)] bg-[#FAF9F6] border border-[#D9D5CC] rounded-[3px] shadow-[0_30px_80px_-20px_rgba(17,17,16,0.45)]'
            : 'relative w-full h-full'}
        >
          {expanded && (
            <div className="flex items-center justify-between gap-4 px-5 h-12 border-b border-[#D9D5CC] shrink-0">
              <span className="text-[14px] font-semibold tracking-[-0.01em] text-[#111110]">{title}</span>
              <div className="flex items-center gap-4">
                <span className="hidden sm:inline font-mono text-[11px] uppercase tracking-[0.14em] text-[#8A877F]">Esc to close</span>
                <button
                  ref={closeRef}
                  type="button"
                  onClick={close}
                  aria-label="Close game"
                  className="w-8 h-8 inline-flex items-center justify-center rounded-full text-[#111110] text-[18px] leading-none
                    hover:bg-[#111110] hover:text-[#F4F2EE] transition-colors
                    focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#111110]"
                >
                  ×
                </button>
              </div>
            </div>
          )}

          <div className="relative flex-1 min-h-0 w-full h-full">
            <canvas
              ref={canvasRef}
              tabIndex={-1}
              aria-label={`${title} game`}
              className={`block w-full h-full outline-none ${status === 'playing' ? 'touch-none cursor-crosshair' : ''}`}
            />

            {status !== 'playing' && (
              <button
                type="button"
                onClick={play}
                className={`group absolute inset-0 flex flex-col items-center justify-center gap-1.5 px-6 text-center
                  ${status === 'idle' || (playedInModal && !expanded) ? 'bg-[#FAF9F6]/95' : 'bg-[#FAF9F6]/85'} backdrop-blur-[2px] cursor-pointer
                  focus-visible:outline focus-visible:outline-2 focus-visible:-outline-offset-4 focus-visible:outline-[#111110]`}
              >
                {status === 'over' && result ? (
                  <>
                    <span className="text-[18px] font-semibold tracking-[-0.02em] text-[#111110]">{result.reason}</span>
                    <span className="font-mono text-[11px] uppercase tracking-[0.14em] text-[#8A877F]">
                      {result.isBest ? 'New best · ' : ''}Score {result.score} · Best {result.best}
                    </span>
                  </>
                ) : status === 'paused' ? (
                  <span className="text-[18px] font-semibold tracking-[-0.02em] text-[#111110]">Paused</span>
                ) : (
                  <>
                    <span className="text-[18px] font-semibold tracking-[-0.02em] text-[#111110]">{title}</span>
                    <span className="max-w-[20rem] text-[13px] leading-snug text-[#5E5B55]">{how}</span>
                  </>
                )}
                <span
                  className="mt-3 inline-flex items-center gap-2 rounded-full bg-[#111110] text-[#F4F2EE] px-5 py-2.5
                    text-[14px] font-medium transition-colors duration-300 group-hover:bg-[#FF4F00]"
                >
                  {action} <span aria-hidden="true">{status === 'over' ? '↻' : '▶'}</span>
                </span>
                {!expanded && (
                  <span className="hidden md:inline mt-1 font-mono text-[10px] uppercase tracking-[0.14em] text-[#8A877F]">
                    Opens in a larger window
                  </span>
                )}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
