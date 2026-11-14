import { COLORS, readBest, saveBest, text } from './engineKit'
import { placeBlock } from './stackRules'

const BLOCK_H = 18
const BEST_KEY = 'stack-release-best'

// One-tap stacking: drop each release onto the last one.
export function createStackGame() {
  const g = {
    stack: [], cur: null, baseW: 0, speed: 0, combo: 0, score: 0,
    best: readBest(BEST_KEY), cam: 0, slices: [], flash: 0, shake: 0, over: false,
  }

  const blockTop = (i, h) => h - 22 - (i + 1) * BLOCK_H + g.cam

  const spawn = (w) => {
    const top = g.stack[g.stack.length - 1]
    const dir = g.stack.length % 2 ? 1 : -1
    g.cur = { x: dir > 0 ? -top.w : w, w: top.w, dir }
    g.speed = Math.min(150 + g.score * 9, 520)
  }

  const drop = ({ w, h }) => {
    const i = g.stack.length
    const res = placeBlock(g.stack[i - 1], g.cur)
    if (res.slice) g.slices.push({ ...res.slice, y: blockTop(i, h), vy: 0, a: 1 })
    if (!res.kept) {
      g.over = true
      g.shake = 1
      const isBest = g.score > g.best
      if (isBest) { g.best = g.score; saveBest(BEST_KEY, g.best) }
      return { over: { reason: 'Merge conflict.', score: g.score, best: g.best, isBest } }
    }
    if (res.perfect) {
      g.combo += 1
      g.flash = 1
      if (g.combo >= 3) {
        const grow = Math.min(12, g.baseW - res.kept.w)
        res.kept.x -= grow / 2
        res.kept.w += grow
      }
    } else {
      g.combo = 0
    }
    g.stack.push(res.kept)
    g.score += 1
    spawn(w)
    return {}
  }

  return {
    reset({ w }) {
      g.baseW = Math.round(Math.min(w * 0.46, 190))
      g.stack = [{ x: (w - g.baseW) / 2, w: g.baseW }]
      Object.assign(g, { combo: 0, score: 0, cam: 0, slices: [], flash: 0, shake: 0, over: false })
      spawn(w)
      g.cur.x = g.cur.dir > 0 ? 0 : w - g.cur.w
    },

    update(dt, { w, h }) {
      const c = g.cur
      if (!g.over && c) {
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
    },

    draw(ctx, { w, h }) {
      const sans = getComputedStyle(document.body).fontFamily
      ctx.save()
      ctx.clearRect(0, 0, w, h)
      if (g.shake) ctx.translate((Math.random() - 0.5) * 8 * g.shake, 0)

      const groundY = h - 22 + g.cam
      if (groundY < h + 2) {
        ctx.fillStyle = COLORS.rule
        ctx.fillRect(0, groundY, w, 1)
      }

      const from = Math.max(0, g.stack.length - Math.ceil(h / BLOCK_H) - 2)
      for (let i = from; i < g.stack.length; i++) {
        const b = g.stack[i]
        ctx.fillStyle = i % 2 ? COLORS.ink : COLORS.ink2
        ctx.fillRect(b.x, blockTop(i, h), b.w, BLOCK_H - 2)
      }

      if (g.flash > 0 && g.stack.length > 1) {
        const i = g.stack.length - 1
        const b = g.stack[i]
        const pad = (1 - g.flash) * 10
        ctx.strokeStyle = COLORS.accent
        ctx.globalAlpha = g.flash
        ctx.lineWidth = 2
        ctx.strokeRect(b.x - pad, blockTop(i, h) - pad, b.w + pad * 2, BLOCK_H - 2 + pad * 2)
        ctx.globalAlpha = 1
      }

      for (const s of g.slices) {
        ctx.globalAlpha = Math.max(0, s.a)
        ctx.fillStyle = COLORS.ink2
        ctx.fillRect(s.x, s.y, s.w, BLOCK_H - 2)
      }
      ctx.globalAlpha = 1

      if (!g.over && g.cur) {
        ctx.fillStyle = COLORS.accent
        ctx.fillRect(g.cur.x, blockTop(g.stack.length, h), g.cur.w, BLOCK_H - 2)
      }
      ctx.restore()

      text(ctx, String(g.score), w / 2, 46, { size: 34, font: sans, weight: '600' })
      text(ctx, `BEST ${g.best}`, w - 14, 22, { align: 'right', size: 10, color: COLORS.muted })
      if (g.combo >= 2 && g.flash > 0) {
        ctx.globalAlpha = g.flash
        text(ctx, `PERFECT ×${g.combo}`, w / 2, 66, { size: 11, color: COLORS.accent })
        ctx.globalAlpha = 1
      }
    },

    pointer(e, size) {
      if (e.type !== 'pointerdown') return null
      e.preventDefault()
      return drop(size)
    },

    key(e, size) {
      if (e.type !== 'keydown' || e.repeat) return null
      if (e.code !== 'Space' && e.code !== 'Enter' && e.code !== 'ArrowDown') return null
      return drop(size)
    },
  }
}
