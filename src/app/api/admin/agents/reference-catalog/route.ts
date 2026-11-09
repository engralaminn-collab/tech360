import { NextRequest } from 'next/server'
import { guard, isResponse } from '@/lib/api-guard'
import { searchAgentReferences } from '@/lib/agents/reference-catalog'

export const dynamic = 'force-dynamic'

export async function GET(req: NextRequest) {
  const access = await guard(req, { minRole: 'SUPER_ADMIN' })
  if (isResponse(access)) return access
  const query = req.nextUrl.searchParams.get('q') ?? ''
  if (query.length > 100) return Response.json({ error: 'Query must be at most 100 characters.' }, { status: 400 })
  return Response.json({
    references: searchAgentReferences(query),
    notice: 'Reference discovery only. No repository or capability is installed, connected, or executable through this catalogue. Licence identifiers are preliminary metadata.',
  }, { headers: { 'Cache-Control': 'private, no-store' } })
}
