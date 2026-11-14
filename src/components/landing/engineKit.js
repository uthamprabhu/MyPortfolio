// Shared canvas loop for the landing mini-games.
// Never runs on its own: the loop only ticks between start()/resume() and pause()/game over.

export const COLORS = {
  ink: '#111110',
  ink2: '#3B3934',
  accent: '#FF4F00',
  rule: '#D9D5CC',
  muted: '#8A877F',
  paper: '#FAF9F6',
}
export const MONO = 'ui-monospace, SFMono-Regular, Menlo, Consolas, monospace'

export const readBest = (key) => {
  try { return Number(localStorage.getItem(key)) || 0 } catch { return 0 }
}
export const saveBest = (key, v) => {
  try { localStorage.setItem(key, String(v)) } catch { /* storage blocked */ }
}

export function text(ctx, str, x, y, { align = 'center', size = 11, color = COLORS.ink, font = MONO, weight = '' } = {}) {
  ctx.font = `${weight} ${size}px ${font}`.trim()
  ctx.fillStyle = color
  ctx.textAlign = align
  ctx.fillText(str, x, y)
}

export function runEngine(canvas, game, { onOver, onAutoPause }) {
  const ctx = canvas.getContext('2d')
  const size = { w: 0, h: 0 }
  let raf = 0
  let last = 0
  let playing = false

  const render = () => { if (size.w) game.draw(ctx, size) }

  const finish = (result) => {
    playing = false
    cancelAnimationFrame(raf)
    raf = 0
    render()
    onOver(result)
  }

  const frame = (now) => {
    const dt = Math.min((now - last) / 1000, 0.05)
    last = now
    const res = game.update(dt, size)
    if (res?.over) return finish(res.over)
    game.draw(ctx, size)
    raf = playing ? requestAnimationFrame(frame) : 0
  }

  const resize = () => {
    const r = canvas.getBoundingClientRect()
    if (!r.width || !r.height) return // hidden tab
    const dpr = Math.min(window.devicePixelRatio || 1, 2)
    const first = !size.w
    size.w = r.width
    size.h = r.height
    canvas.width = Math.round(size.w * dpr)
    canvas.height = Math.round(size.h * dpr)
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    if (first) game.reset(size)
    render()
  }

  const api = {
    playing: () => playing,
    start() {
      resize() // the canvas may have just grown into the modal
      game.reset(size)
      playing = false
      api.resume()
    },
    resume() {
      resize()
      if (playing || !size.w) return
      playing = true
      last = performance.now()
      raf = requestAnimationFrame(frame)
    },
    pause() {
      playing = false
      cancelAnimationFrame(raf)
      raf = 0
      render()
    },
    destroy: () => {},
  }

  const autoPause = () => {
    if (!playing) return
    api.pause()
    onAutoPause()
  }

  const onPointer = (e) => {
    if (!playing) return
    const res = game.pointer?.(e, size, canvas)
    if (res?.over) finish(res.over)
  }
  const onKey = (e) => {
    if (!playing) return
    const res = game.key?.(e, size)
    if (!res) return
    e.preventDefault()
    if (res.over) finish(res.over)
  }
  const onVisibility = () => { if (document.hidden) autoPause() }

  const ro = new ResizeObserver(resize)
  const io = new IntersectionObserver(([entry]) => { if (!entry.isIntersecting) autoPause() })

  resize()
  ro.observe(canvas)
  io.observe(canvas)
  const POINTER_EVENTS = ['pointerdown', 'pointermove', 'pointerup', 'pointerleave', 'pointercancel']
  POINTER_EVENTS.forEach((t) => canvas.addEventListener(t, onPointer))
  window.addEventListener('keydown', onKey)
  window.addEventListener('keyup', onKey)
  window.addEventListener('blur', autoPause)
  document.addEventListener('visibilitychange', onVisibility)

  api.destroy = () => {
    playing = false
    cancelAnimationFrame(raf)
    ro.disconnect()
    io.disconnect()
    POINTER_EVENTS.forEach((t) => canvas.removeEventListener(t, onPointer))
    window.removeEventListener('keydown', onKey)
    window.removeEventListener('keyup', onKey)
    window.removeEventListener('blur', autoPause)
    document.removeEventListener('visibilitychange', onVisibility)
  }

  return api
}
