// Run with: node --test src/components/proof
import assert from 'node:assert/strict'
import { test } from 'node:test'

import { canOpen, freshVisits, visit } from './proofRules.js'

test('cached side only calls the API on a first visit', () => {
  let s = freshVisits
  for (const tab of ['Market', 'Rental', 'Market', 'Market', 'Rental']) s = visit(s, tab)
  assert.equal(s.plain, 5)
  assert.equal(s.cached, 2)
  assert.equal(s.hit, true)
})

test('before the fix every known URL opens; after it only the dashboard does', () => {
  assert.equal(canOpen('/hr/payroll', false).result, 'open')
  assert.equal(canOpen('/hr/payroll', true).result, 'blocked')
  assert.equal(canOpen('/dashboard', true).result, 'open')
  assert.equal(canOpen(' HR/Payroll/ ', true).result, 'blocked')
  assert.equal(canOpen('/nope', false).result, 'missing')
})
