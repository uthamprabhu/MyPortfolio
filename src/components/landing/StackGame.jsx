'use client'

import { useEffect, useRef } from 'react'

import { placeBlock } from './stackRules'

const INK = '#111110'
const INK_2 = '#3B3934'
const ACCENT = '#FF4F00'
const RULE = '#D9D5CC'
const MUTED = '#8A877F'
const MONO = 'ui-monospace, SFMono-Regular, Menlo, Consolas, monospace'

const BLOCK_H = 18
const BEST_KEY = 'stack-release-best'

const readBest = () => {
  try { return Number(localStorage.getItem(BEST_KEY)) || 0 } catch { return 0 }
}
const saveBest = (v) => {
  try { localStorage.setItem(BEST_KEY, String(v)) } catch { /* storage blocked */ }
}

// Original one-tap stacking game: drop each release onto the last one.
export default function StackGame() {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    const sans = getComputedStyle(document.body).fontFamily
    let w = 0
    let h = 0
    let raf = 0
    let last = 0
    let visible = false
    let overAt = 0

    const g = {
      mode: 'play', stack: [], cur: null, baseW: 0, speed: 0, combo: 0,
      score: 0, best: readBest(), cam: 0, slices: [], flash: 0, shake: 0,
    }

    const spawn = () => {
      const top = g.stack[g.stack.length - 1]
      const dir = g.stack.length % 2 ? 1 : -1
      g.cur = { x: dir > 0 ? -top.w : w, w: top.w, dir }
      g.speed = Math.min(150 + g.score * 9, 520)
      canvas.dataset.state = `${g.mode}:${g.score}:${Math.round(g.cur.w)}:${g.combo}`
    }

    const reset = () => {
      g.baseW = Math.round(Math.min(w * 0.46, 190))
      g.stack = [{ x: (w - g.baseW) / 2, w: g.baseW }]
      Object.assign(g, { mode: 'play', combo: 0, score: 0, cam: 0, slices: [], flash: 0, shake: 0 })
      spawn()
    }

    const blockTop = (i) => h - 22 - (i + 1) * BLOCK_H + g.cam

    const drop = () => {
      if (g.mode === 'over') {
        if (performance.now() - overAt > 450) reset()
        return
      }
      const i = g.stack.length
      const top = g.stack[i - 1]
      const res = placeBlock(top, g.cur)
      if (res.slice) g.slices.push({ ...res.slice, y: blockTop(i), vy: 0, a: 1 })
      if (!res.kept) {
        g.mode = 'over'
        g.shake = 1
        overAt = performance.now()
        if (g.score > g.best) { g.best = g.score; saveBest(g.best) }
        canvas.dataset.state = `over:${g.score}:0:0`
        return
      }
      if (res.perfect) {
        g.combo += 1
        g.flash = 1
        if (g.combo >= 3) {
          // Combo reward: grow back toward the starting width
          const grow = Math.min(12, g.baseW - res.kept.w)
          res.kept.x -= grow / 2
          res.kept.w += grow
        }
      } else {
        g.combo = 0
      }
      g.stack.push(res.kept)
      g.score += 1
      spawn()
    }

    const update = (dt) => {
      const c = g.cur
      if (g.mode === 'play' && c) {
        c.x += c.dir * g.speed * dt
        if (c.dir > 0 && c.x > w - c.w) { c.x = w - c.w; c.dir = -1 }
        if (c.dir < 0 && c.x < 0) { c.x = 0; c.dir = 1 }
      }
      for (const s of g.slices) { s.vy += 1600 * dt; s.y += s.vy * dt; s.a -= dt * 1.4 }
      g.slices = g.slices.filter((s) => s.a > 0)
      const camTarget = Math.max(0, (g.stack.length + 1) * BLOCK_H - h * 0.5)
      g.cam += (camTarget - g.cam) * Math.min(1, dt * 8)
      g.flash = Math.max(0, g.flash - dt * 2.2)
      g.shake = Math.max(0, g.shake - dt * 3)
    }

    const label = (str, x, y, { align = 'center', size = 11, color = INK, font = MONO, weight = '' } = {}) => {
      ctx.font = `${weight} ${size}px ${font}`.trim()
      ctx.fillStyle = color
      ctx.textAlign = align
      ctx.fillText(str, x, y)
    }

    const draw = () => {
      ctx.save()
      ctx.clearRect(0, 0, w, h)
      if (g.shake) ctx.translate((Math.random() - 0.5) * 8 * g.shake, 0)

      const groundY = h - 22 + g.cam
      if (groundY < h + 2) {
        ctx.fillStyle = RULE
        ctx.fillRect(0, groundY, w, 1)
      }

      const from = Math.max(0, g.stack.length - Math.ceil(h / BLOCK_H) - 2)
      for (let i = from; i < g.stack.length; i++) {
        const b = g.stack[i]
        ctx.fillStyle = i % 2 ? INK : INK_2
        ctx.fillRect(b.x, blockTop(i), b.w, BLOCK_H - 2)
      }

      // Perfect-drop glow on the newest block
      if (g.flash > 0 && g.stack.length > 1) {
        const i = g.stack.length - 1
        const b = g.stack[i]
        ctx.strokeStyle = ACCENT
        ctx.globalAlpha = g.flash
        ctx.lineWidth = 2
        const pad = (1 - g.flash) * 10
        ctx.strokeRect(b.x - pad, blockTop(i) - pad, b.w + pad * 2, BLOCK_H - 2 + pad * 2)
        ctx.globalAlpha = 1
      }

      for (const s of g.slices) {
        ctx.globalAlpha = Math.max(0, s.a)
        ctx.fillStyle = INK_2
        ctx.fillRect(s.x, s.y, s.w, BLOCK_H - 2)
      }
      ctx.globalAlpha = 1

      if (g.mode === 'play' && g.cur) {
        ctx.fillStyle = ACCENT
        ctx.fillRect(g.cur.x, blockTop(g.stack.length), g.cur.w, BLOCK_H - 2)
      }
      ctx.restore()

      // HUD
      label(String(g.score), w / 2, 46, { size: 34, font: sans, weight: '600' })
      label(`BEST ${g.best}`, w - 14, 22, { align: 'right', size: 10, color: MUTED })
      if (g.combo >= 2 && g.flash > 0) {
        ctx.globalAlpha = g.flash
        label(`PERFECT ×${g.combo}`, w / 2, 66, { size: 11, color: ACCENT })
        ctx.globalAlpha = 1
      } else if (g.mode === 'play' && g.score === 0) {
        label('Tap to drop. Line it up.', w / 2, 66, { size: 11, color: MUTED })
      }

      if (g.mode === 'over') {
        ctx.fillStyle = 'rgba(250, 249, 246, 0.86)'
        ctx.fillRect(0, h / 2 - 34, w, 68)
        label('Merge conflict.', w / 2, h / 2 - 6, { size: 18, font: sans, weight: '600' })
        label(g.score >= g.best && g.score > 0 ? 'New best. Tap to go again' : 'Tap to try again', w / 2, h / 2 + 16, { size: 11, color: MUTED })
      }
    }

    const loop = (now) => {
      const dt = Math.min((now - last) / 1000, 0.05)
      last = now
      update(dt)
      draw()
      raf = visible && !document.hidden ? requestAnimationFrame(loop) : 0
    }
    const start = () => {
      if (raf || !visible || document.hidden) return
      last = performance.now()
      raf = requestAnimationFrame(loop)
    }

    const onPointer = (e) => {
      e.preventDefault()
      canvas.focus({ preventScroll: true })
      drop()
    }
    const onKey = (e) => {
      if (!visible || (e.code !== 'Space' && e.code !== 'Enter' && e.code !== 'ArrowDown')) return
      const el = document.activeElement
      if (el && el !== document.body && el !== canvas) return
      e.preventDefault()
      drop()
    }

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      const r = canvas.getBoundingClientRect()
      const first = w === 0
      w = r.width
      h = r.height
      canvas.width = Math.round(w * dpr)
      canvas.height = Math.round(h * dpr)
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      if (first) reset()
      draw()
    }

    // Only animate while the game is on screen and the tab is visible
    const io = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting
      if (visible) start()
    })
    const onVisibility = () => start()
    const ro = new ResizeObserver(resize)

    resize()
    ro.observe(canvas)
    io.observe(canvas)
    canvas.addEventListener('pointerdown', onPointer)
    window.addEventListener('keydown', onKey)
    document.addEventListener('visibilitychange', onVisibility)

    return () => {
      cancelAnimationFrame(raf)
      ro.disconnect()
      io.disconnect()
      canvas.removeEventListener('pointerdown', onPointer)
      window.removeEventListener('keydown', onKey)
      document.removeEventListener('visibilitychange', onVisibility)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      tabIndex={0}
      aria-label="Stacking game: tap, click or press Space to drop each block onto the stack"
      className="block w-full h-full touch-none cursor-pointer outline-none"
    />
  )
}
