export const PERFECT = 5 // px tolerance for a perfect drop

// Where a dropped block lands on the one below: kept part, sliced-off part, and whether it was perfect.
export function placeBlock(top, cur) {
  const diff = cur.x - top.x
  if (Math.abs(diff) <= PERFECT) return { kept: { x: top.x, w: cur.w }, slice: null, perfect: true }
  const overlap = cur.w - Math.abs(diff)
  if (overlap <= 0) return { kept: null, slice: { x: cur.x, w: cur.w }, perfect: false }
  return diff > 0
    ? { kept: { x: cur.x, w: overlap }, slice: { x: cur.x + overlap, w: diff }, perfect: false }
    : { kept: { x: top.x, w: overlap }, slice: { x: cur.x, w: -diff }, perfect: false }
}
