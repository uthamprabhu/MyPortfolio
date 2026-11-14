import { COLORS, MONO, readBest, saveBest, text } from './engineKit'
import { fallHits, nextMultiplier, sweepHits } from './bugRules'

const BEST_KEY = 'no-bugs-best'
const TOKENS = [
  '{ }', '=>', ';', '</>', '( )', '[ ]', '&&', '===', 'const', 'return', 'async', 'await',
  'git push', 'git commit', 'npm i', '200 OK', '✓ tests', 'merge', 'deploy', 'useState',
]
const MAX_LIVES = 5
const KEY_SPEED = 460 // px/s for the keyboard catcher
const SLOW_SECONDS = 5 // how long a `debugger;` slow-mo lasts
const SLOW_SCALE = 0.45 // world speed while slowed
const SLOW_LABEL = 'debugger;'

const chipWidth = (label, k) => Math.round((label.length * 7.4 + 22) * k)

// Falling code tokens: swipe or hover through them to collect. Touch a bug and the run ends.
export function createBugGame() {
  const g = {
    items: [], spawnIn: 0, t: 0, score: 0, lives: 3, mult: 1, lastHit: -9, best: readBest(BEST_KEY), k: 1, density: 1,
    ptr: null, trail: [], pops: [], keys: { left: false, right: false }, catcher: null, over: false, slow: 0,
  }

  const fallSpeed = () => Math.min(150 + g.t * 7, 560)

  const spawn = (w, h) => {
    const bugChance = 0.2 + Math.min(g.t / 100, 0.14)
    const r = Math.random()
    let it
    if (r < bugChance) {
      it = { type: 'bug', w: 28 * g.k, h: 24 * g.k }
    } else if (r > 0.975 && g.lives < MAX_LIVES) {
      it = { type: 'coffee', label: 'coffee +1', w: chipWidth('coffee +1', g.k), h: 26 * g.k }
    } else if (r > 0.94 && g.t > 8 && g.slow <= 0 && !g.items.some((i) => i.type === 'slow')) {
      it = { type: 'slow', label: SLOW_LABEL, w: chipWidth(SLOW_LABEL, g.k), h: 26 * g.k }
    } else {
      const label = TOKENS[Math.floor(Math.random() * TOKENS.length)]
      it = { type: 'code', label, w: chipWidth(label, g.k), h: 26 * g.k }
    }
    it.x = Math.random() * Math.max(1, w - it.w)
    it.y = -it.h - 4
    it.prevY = it.y
    // Taller canvas = longer drop, so scale speed to keep the same feel
    it.vy = fallSpeed() * Math.max(1, h / 340) * (0.8 + Math.random() * 0.5)
    g.items.push(it)
    g.spawnIn = Math.max(0.2, 0.7 - g.t * 0.011) * (0.6 + Math.random() * 0.8) * g.density
  }

  const endRun = (reason) => {
    g.over = true
    const isBest = g.score > g.best
    if (isBest) { g.best = g.score; saveBest(BEST_KEY, g.best) }
    return { over: { reason, score: g.score, best: g.best, isBest } }
  }

  // Resolve touched items; returns a game-over result if a bug was touched.
  const touch = (indexes) => {
    if (!indexes.length) return null
    const hit = indexes.map((i) => g.items[i])
    if (hit.some((it) => it.type === 'bug')) return endRun('You touched a bug.')
    for (const it of hit) {
      const cx = it.x + it.w / 2
      if (it.type === 'coffee') {
        g.lives = Math.min(g.lives + 1, MAX_LIVES)
        g.pops.push({ x: cx, y: it.y, label: '+1 life', a: 1, accent: true })
      } else if (it.type === 'slow') {
        g.slow = SLOW_SECONDS
        g.pops.push({ x: cx, y: it.y, label: 'slow-mo · 2× points', a: 1, accent: true })
      } else {
        g.mult = nextMultiplier(g.mult, g.t - g.lastHit)
        g.lastHit = g.t
        const pts = 10 * g.mult * (g.slow > 0 ? 2 : 1)
        g.score += pts
        g.pops.push({ x: cx, y: it.y, label: `+${pts}`, a: 1, accent: g.mult > 1 || g.slow > 0 })
      }
    }
    g.items = g.items.filter((_, i) => !indexes.includes(i))
    return null
  }

  const drawBug = (ctx, it, pulse) => {
    const cx = it.x + it.w / 2
    const cy = it.y + it.h / 2 + 2
    const s = it.w * 0.62
    ctx.strokeStyle = COLORS.accent
    ctx.globalAlpha = 0.35 + 0.35 * pulse
    ctx.lineWidth = 1.5
    ctx.beginPath()
    ctx.arc(cx, cy, it.w * 0.62, 0, Math.PI * 2)
    ctx.stroke()
    ctx.globalAlpha = 1
    ctx.strokeStyle = COLORS.ink
    ctx.fillStyle = COLORS.ink
    for (const dy of [-0.25, 0.05, 0.35]) {
      ctx.beginPath()
      ctx.moveTo(cx - s * 0.85, cy + dy * s)
      ctx.lineTo(cx + s * 0.85, cy + dy * s)
      ctx.stroke()
    }
    ctx.beginPath()
    ctx.ellipse(cx, cy, s * 0.45, s * 0.6, 0, 0, Math.PI * 2)
    ctx.fill()
    ctx.beginPath()
    ctx.arc(cx, cy - s * 0.68, s * 0.24, 0, Math.PI * 2)
    ctx.fill()
    ctx.beginPath()
    ctx.moveTo(cx - s * 0.12, cy - s * 0.85)
    ctx.lineTo(cx - s * 0.35, cy - s * 1.15)
    ctx.moveTo(cx + s * 0.12, cy - s * 0.85)
    ctx.lineTo(cx + s * 0.35, cy - s * 1.15)
    ctx.stroke()
  }

  const CHIP_STYLE = {
    code: { fill: '#FFFFFF', stroke: COLORS.ink, ink: COLORS.ink },
    coffee: { fill: COLORS.accent, stroke: COLORS.accent, ink: '#FFFFFF' },
    slow: { fill: COLORS.ink, stroke: COLORS.ink, ink: '#FFFFFF' },
  }

  const drawChip = (ctx, it, pulse) => {
    const st = CHIP_STYLE[it.type]
    ctx.fillStyle = st.fill
    ctx.strokeStyle = st.stroke
    ctx.lineWidth = 1
    ctx.beginPath()
    if (ctx.roundRect) ctx.roundRect(it.x + 0.5, it.y + 0.5, it.w - 1, it.h - 1, 6)
    else ctx.rect(it.x + 0.5, it.y + 0.5, it.w - 1, it.h - 1)
    ctx.fill()
    ctx.stroke()
    if (it.type === 'slow') {
      // Glow so the power-up reads as special
      ctx.strokeStyle = COLORS.accent
      ctx.globalAlpha = 0.3 + 0.5 * pulse
      ctx.lineWidth = 2
      ctx.strokeRect(it.x - 3, it.y - 3, it.w + 6, it.h + 6)
      ctx.globalAlpha = 1
    }
    text(ctx, it.label, it.x + it.w / 2, it.y + it.h / 2 + 4 * g.k, { size: Math.round(12 * g.k), color: st.ink })
  }

  return {
    reset({ w, h }) {
      // Bigger window: bigger chips and denser spawns, so it never feels empty
      g.k = Math.max(1, Math.min(1.4, Math.min(w / 560, h / 400)))
      g.density = Math.max(0.55, Math.min(1, 520 / w))
      Object.assign(g, {
        items: [], spawnIn: 0.35, t: 0, score: 0, lives: 3, mult: 1, lastHit: -9, slow: 0,
        ptr: null, trail: [], pops: [], keys: { left: false, right: false }, catcher: null, over: false,
      })
    },

    update(dt, { w, h }) {
      // Slow-mo scales the whole world (falling, spawning, difficulty ramp); the timer runs in real time.
      const wdt = g.slow > 0 ? dt * SLOW_SCALE : dt
      g.slow = Math.max(0, g.slow - dt)
      g.t += wdt
      g.spawnIn -= wdt
      if (g.spawnIn <= 0) spawn(w, h)

      for (const it of g.items) { it.prevY = it.y; it.y += it.vy * wdt }

      // A resting cursor or finger catches whatever falls through it this frame
      if (g.ptr?.active) {
        const over = touch(fallHits(g.items, g.ptr.x, g.ptr.y))
        if (over) return over
      }

      const fallen = g.items.filter((it) => it.y > h)
      g.items = g.items.filter((it) => it.y <= h)
      for (const it of fallen) {
        if (it.type !== 'code') continue
        g.lives -= 1
        g.mult = 1
        g.pops.push({ x: it.x + it.w / 2, y: h - 30, label: 'missed', a: 1, accent: true })
      }
      if (g.lives <= 0) return endRun('Three tokens dropped.')

      // Keyboard catcher sweeps along the bottom
      if (g.keys.left || g.keys.right) {
        g.catcher ??= { x: w / 2 }
        g.catcher.x = Math.max(24, Math.min(w - 24, g.catcher.x + (g.keys.right - g.keys.left) * KEY_SPEED * dt))
      }
      if (g.catcher) {
        const cy = h - 40
        const over = touch(sweepHits(g.items, g.catcher.x - 30, cy, g.catcher.x + 30, cy, 2))
        if (over) return over
      }

      if (g.t - g.lastHit > 1.2) g.mult = 1
      for (const p of g.pops) { p.y -= 40 * dt; p.a -= dt * 1.6 }
      g.pops = g.pops.filter((p) => p.a > 0)
      for (const tp of g.trail) tp.a -= dt * 4
      g.trail = g.trail.filter((tp) => tp.a > 0)
      return null
    },

    draw(ctx, { w, h }) {
      const sans = getComputedStyle(document.body).fontFamily
      ctx.clearRect(0, 0, w, h)
      const pulse = (Math.sin(g.t * 10) + 1) / 2

      if (g.slow > 0) {
        // Slow-mo frame: accent border plus a draining timer bar
        ctx.strokeStyle = COLORS.accent
        ctx.lineWidth = 3
        ctx.strokeRect(1.5, 1.5, w - 3, h - 3)
        ctx.fillStyle = COLORS.accent
        ctx.fillRect(0, h - 3, w * (g.slow / SLOW_SECONDS), 3)
      }

      for (const it of g.items) {
        if (it.type === 'bug') drawBug(ctx, it, pulse)
        else drawChip(ctx, it, pulse)
      }

      if (g.trail.length > 1) {
        ctx.strokeStyle = COLORS.accent
        ctx.lineWidth = 3
        ctx.lineCap = 'round'
        for (let i = 1; i < g.trail.length; i++) {
          ctx.globalAlpha = Math.max(0, g.trail[i].a)
          ctx.beginPath()
          ctx.moveTo(g.trail[i - 1].x, g.trail[i - 1].y)
          ctx.lineTo(g.trail[i].x, g.trail[i].y)
          ctx.stroke()
        }
        ctx.globalAlpha = 1
      }

      if (g.catcher) {
        ctx.fillStyle = COLORS.ink
        ctx.fillRect(g.catcher.x - 30, h - 42, 60, 4)
      }

      for (const p of g.pops) {
        ctx.globalAlpha = Math.max(0, p.a)
        text(ctx, p.label, p.x, p.y, { size: 12, color: p.accent ? COLORS.accent : COLORS.ink, font: MONO, weight: '600' })
      }
      ctx.globalAlpha = 1

      // HUD
      text(ctx, String(g.score), w / 2, 40, { size: 30, font: sans, weight: '600' })
      const tags = []
      if (g.slow > 0) tags.push(`SLOW-MO 2× · ${g.slow.toFixed(1)}s`)
      if (g.mult > 1) tags.push(`×${g.mult} combo`)
      if (tags.length) text(ctx, tags.join('   '), w / 2, 58, { size: 11, color: COLORS.accent })
      for (let i = 0; i < Math.max(3, g.lives); i++) {
        ctx.fillStyle = i < g.lives ? COLORS.ink : COLORS.rule
        ctx.fillRect(14 + i * 12, 14, 8, 8)
      }
      text(ctx, `BEST ${g.best}`, w - 14, 22, { align: 'right', size: 10, color: COLORS.muted })
    },

    pointer(e, size, canvas) {
      const isMouse = e.pointerType === 'mouse'
      if (e.type === 'pointerleave' || e.type === 'pointercancel' || (e.type === 'pointerup' && !isMouse)) {
        g.ptr = null // finger lifted or cursor left: stop catching
        return null
      }
      if (e.type === 'pointerup') return null
      if (e.type === 'pointermove' && !isMouse && !e.buttons) return null

      const r = canvas.getBoundingClientRect()
      const x = e.clientX - r.left
      const y = e.clientY - r.top
      if (e.type === 'pointerdown') e.preventDefault()
      // Only sweep from a recent point, so re-entering the canvas never draws a line across it
      const fresh = e.type === 'pointerdown' || !g.ptr || g.t - g.ptr.t > 0.1
      const from = fresh ? { x, y } : g.ptr
      g.ptr = { x, y, t: g.t, active: true }
      g.trail.push({ x, y, a: 1 })
      if (g.trail.length > 14) g.trail.shift()
      return touch(sweepHits(g.items, from.x, from.y, x, y))
    },

    key(e) {
      const down = e.type === 'keydown'
      if (e.code === 'ArrowLeft') g.keys.left = down
      else if (e.code === 'ArrowRight') g.keys.right = down
      else return null
      return {}
    },
  }
}
