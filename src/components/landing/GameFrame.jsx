'use client'

import { useEffect, useImperativeHandle, useRef, useState } from 'react'

import { runEngine } from './engineKit'

// Canvas + Play / Resume / Retry overlay. Games never start on their own.
export default function GameFrame({ ref, makeGame, title, how }) {
  const canvasRef = useRef(null)
  const engineRef = useRef(null)
  const [status, setStatus] = useState('idle') // idle | playing | paused | over
  const [result, setResult] = useState(null)

  useEffect(() => {
    const engine = runEngine(canvasRef.current, makeGame(), {
      onOver: (r) => { setResult(r); setStatus('over') },
      onAutoPause: () => setStatus('paused'),
    })
    engineRef.current = engine
    return () => engine.destroy()
  }, [makeGame])

  useImperativeHandle(ref, () => ({
    pause() {
      if (!engineRef.current?.playing()) return
      engineRef.current.pause()
      setStatus('paused')
    },
  }), [])

  const play = () => {
    const engine = engineRef.current
    if (status === 'paused') engine.resume()
    else engine.start()
    setStatus('playing')
    canvasRef.current.focus({ preventScroll: true })
  }

  const action = status === 'paused' ? 'Resume' : status === 'over' ? 'Retry' : 'Play'

  return (
    <div className="relative w-full h-full">
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
          className="group absolute inset-0 flex flex-col items-center justify-center gap-1.5 px-6 text-center
            bg-[#FAF9F6]/85 backdrop-blur-[2px] cursor-pointer
            focus-visible:outline focus-visible:outline-2 focus-visible:-outline-offset-4 focus-visible:outline-[#111110]"
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
              <span className="max-w-[18rem] text-[13px] leading-snug text-[#5E5B55]">{how}</span>
            </>
          )}
          <span
            className="mt-3 inline-flex items-center gap-2 rounded-full bg-[#111110] text-[#F4F2EE] px-5 py-2.5
              text-[14px] font-medium transition-colors duration-300 group-hover:bg-[#FF4F00]"
          >
            {action} <span aria-hidden="true">{status === 'over' ? '↻' : '▶'}</span>
          </span>
        </button>
      )}
    </div>
  )
}
