import { strict as assert } from 'node:assert'
import { readFileSync } from 'node:fs'
import { createHash } from 'node:crypto'
import { test } from 'node:test'
import { officialInfoHtml } from '../src/lib/letterhead'

test('public information links to existing PDFs without claiming a PDF-based renderer', () => {
  const html = officialInfoHtml()
  assert.match(html, /href="\/official\/TECH360-Official-Info\.pdf"/)
  assert.match(html, /href="\/official\/TECH360_Official_A4_Letterhead\.pdf"/)
  assert.match(html, /not currently generated using the official letterhead PDF/)
  assert.match(html, /automated document verification or revocation service is not currently available/)
  assert.match(html, /href="\/#\/portal"/)
  assert.doesNotMatch(html, /0\.0\.0\.0|127\.0\.0\.1|wa\.me\/8801327100297|STAFF_ADMIN_PASSWORD/)
})

test('existing letterhead copies match without changing either original', () => {
  const official = readFileSync('public/official/TECH360_Official_A4_Letterhead.pdf')
  const brand = readFileSync('public/brand/TECH360_Official_A4_Letterhead.pdf')
  const info = readFileSync('public/official/TECH360-Official-Info.pdf')
  assert.equal(official.subarray(0, 5).toString(), '%PDF-')
  assert.equal(info.subarray(0, 5).toString(), '%PDF-')
  assert.equal(createHash('sha256').update(official).digest('hex'), createHash('sha256').update(brand).digest('hex'))
})
