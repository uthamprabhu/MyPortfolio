// Indexes of items touched by a pointer moving from (x0,y0) to (x1,y1).
// Sampled along the segment so fast swipes can't skip over an item.
export function sweepHits(items, x0, y0, x1, y1, pad = 4) {
  const dist = Math.hypot(x1 - x0, y1 - y0)
  const steps = Math.max(1, Math.ceil(dist / 6))
  const hits = new Set()
  for (let s = 0; s <= steps; s++) {
    const px = x0 + ((x1 - x0) * s) / steps
    const py = y0 + ((y1 - y0) * s) / steps
    items.forEach((it, i) => {
      if (px >= it.x - pad && px <= it.x + it.w + pad && py >= it.y - pad && py <= it.y + it.h + pad) hits.add(i)
    })
  }
  return [...hits]
}

// Indexes of items that fell through a resting point this frame (item moved from prevY to y).
// Catches tokens dropping onto a still cursor or finger, even when they move further than their height per frame.
export function fallHits(items, px, py, pad = 4) {
  const hits = []
  items.forEach((it, i) => {
    const top = Math.min(it.prevY ?? it.y, it.y) - pad
    const bottom = Math.max(it.prevY ?? it.y, it.y) + it.h + pad
    if (px >= it.x - pad && px <= it.x + it.w + pad && py >= top && py <= bottom) hits.push(i)
  })
  return hits
}

// Consecutive catches within this window raise the multiplier (max ×5).
export const nextMultiplier = (mult, sinceLastHit) => (sinceLastHit < 0.6 ? Math.min(mult + 1, 5) : 1)
