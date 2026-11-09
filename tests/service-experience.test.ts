import { strict as assert } from 'node:assert'
import { readFileSync, existsSync } from 'node:fs'
import { test } from 'node:test'

test('CRM and automation have labelled interactive workflow concepts', () => {
  const source = readFileSync('src/components/site/ServiceJourney.tsx', 'utf8')
  assert.match(source, /custom-crm-development/)
  assert.match(source, /ai-business-automation/)
  assert.match(source, /n8n-workflow-automation/)
  assert.match(source, /aria-pressed/)
  assert.match(source, /Illustrative workflow, not a live product demo/)
  assert.match(readFileSync('src/components/site/ServiceDetailView.tsx', 'utf8'), /<ServiceJourney key=\{service\.slug\}/)
})

test('service catalogue uses local illustration and avoids blanket payment language', () => {
  const source = readFileSync('src/components/site/ServicesView.tsx', 'utf8')
  assert.ok(existsSync('public/images/services-workspace.jpg'))
  assert.match(source, /\/images\/services-workspace\.jpg/)
  assert.doesNotMatch(source, /previewed before payment/)
  const detail = readFileSync('src/components/site/ServiceDetailView.tsx', 'utf8')
  assert.doesNotMatch(detail, /payment only after your/)
})
