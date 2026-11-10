import test from 'node:test'
import assert from 'node:assert/strict'
import { LEGAL_DOCS, getLegalDoc } from '../src/data/site'

test('client protection policies are published in the canonical legal index', () => {
  const required = [
    'terms',
    'refund',
    'delivery',
    'payment',
    'client-approval',
    'privacy',
    'source-code-handover',
    'ownership',
    'pricing-transparency',
    'independence',
    'warranty-support',
    'company-transparency',
  ]
  const slugs = LEGAL_DOCS.map((doc) => doc.slug)
  assert.equal(new Set(slugs).size, slugs.length, 'legal policy slugs must be unique')
  for (const slug of required) {
    assert.ok(getLegalDoc(slug), `missing legal policy: ${slug}`)
  }
})

test('standard payment terms consistently place payment after preview approval', () => {
  const payment = getLegalDoc('payment')
  const refund = getLegalDoc('refund')
  const delivery = getLegalDoc('delivery')
  assert.ok(payment && refund && delivery)
  const paymentText = payment.sections.flatMap((section) => section.body).join(' ').toLowerCase()
  const refundText = refund.sections.flatMap((section) => section.body).join(' ').toLowerCase()
  const deliveryText = delivery.sections.flatMap((section) => section.body).join(' ').toLowerCase()
  assert.match(paymentText, /100% of the agreed project fee/)
  assert.match(refundText, /before approving the preview/)
  assert.match(deliveryText, /full agreed payment/)
  assert.doesNotMatch(paymentText, /40% after preview approval/)
})

test('ownership, deletion, independence, warranty and verification terms are explicit', () => {
  const handover = getLegalDoc('source-code-handover')
  const ownership = getLegalDoc('ownership')
  const independence = getLegalDoc('independence')
  const warranty = getLegalDoc('warranty-support')
  const verification = getLegalDoc('company-transparency')
  assert.ok(handover && ownership && independence && warranty && verification)
  const all = [handover, ownership, independence, warranty, verification]
    .flatMap((doc) => doc.sections.flatMap((section) => section.body))
    .join(' ')
    .toLowerCase()
  for (const term of ['30 calendar days', '90 calendar days', 'perpetual', 'another developer', 'missouri secretary of state', 'illustrative']) {
    assert.ok(all.includes(term), `missing required policy term: ${term}`)
  }
})
