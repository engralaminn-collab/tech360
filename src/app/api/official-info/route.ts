import { officialInfoHtml } from '@/lib/letterhead'

export const dynamic = 'force-dynamic'

// Public HTML information page. The existing PDFs are linked separately;
// this HTML renderer does not apply the official PDF as a background.
export async function GET() {
  return new Response(officialInfoHtml(), {
    headers: {
      'Content-Type': 'text/html; charset=utf-8',
      'Cache-Control': 'public, max-age=300',
    },
  })
}
