// Pure logic behind the playable proofs. These simulate the idea, they are not client code.

// CineArtery's four account types, the settings pages the real caching work covered
export const TABS = ['Market', 'Rental', 'Producer', 'Cast & Crew']

export const freshVisits = { plain: 0, cached: 0, seen: [] }

// One tab click: the uncached side always calls the API, the cached side only on a first visit.
export function visit(state, tab) {
  const hit = state.seen.includes(tab)
  return {
    plain: state.plain + 1,
    cached: state.cached + (hit ? 0 : 1),
    seen: hit ? state.seen : [...state.seen, tab],
    hit,
  }
}

// The visitor is always a plain employee; `open: true` marks the only page they should reach.
export const ROUTES = [
  { path: '/dashboard', title: 'Dashboard', open: true },
  { path: '/hr/payroll', title: 'Payroll' },
  { path: '/hr/appraisals', title: 'Appraisals' },
  { path: '/leads/export', title: 'Lead export' },
  { path: '/admin/roles', title: 'Role settings' },
]

// 'open' | 'blocked' | 'missing'
export function canOpen(path, guarded) {
  const clean = `/${path.trim().toLowerCase().replace(/^\/+|\/+$/g, '')}`
  const route = ROUTES.find((r) => r.path === clean)
  if (!route) return { result: 'missing' }
  return { result: !guarded || route.open ? 'open' : 'blocked', route }
}
