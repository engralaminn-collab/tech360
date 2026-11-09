import { strict as assert } from 'node:assert'
import { existsSync, readFileSync } from 'node:fs'
import { test } from 'node:test'
import { INDUSTRIES, getService } from '../src/data/site'
import { INDUSTRY_IMAGES, industryImage } from '../src/data/industry-images'

test('every industry has a locally available visual and at least one linked service', () => {
  assert.equal(INDUSTRIES.length, 20)
  assert.equal(Object.keys(INDUSTRY_IMAGES).length, INDUSTRIES.length)
  for (const industry of INDUSTRIES) {
    const image = industryImage(industry.slug)
    assert.ok(image, `missing image for ${industry.slug}`)
    assert.ok(existsSync(`public${image}`), `missing asset ${image}`)
    assert.ok(industry.recommended.some((slug) => getService(slug)), `missing service for ${industry.slug}`)
  }
})

test('industry grid shows services and labels representative generated imagery', () => {
  const source = readFileSync('src/components/site/IndustriesView.tsx', 'utf8')
  assert.match(source, /industry\.recommended\.map\(getService\)/)
  assert.match(source, /AI-generated and illustrative/)
  assert.match(source, /industryImage\(industry\.slug\)/)
})
