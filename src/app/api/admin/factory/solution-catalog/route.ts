import { NextRequest } from 'next/server'
import { guard, isResponse } from '@/lib/api-guard'
import { SOLUTION_CATALOG } from '@/lib/factory/solution-catalog'

export const dynamic = 'force-dynamic'

/** Read-only scope inventory. This endpoint does not provision or activate software. */
export async function GET(req: NextRequest) {
  const access = await guard(req, { minRole: 'SUPER_ADMIN' })
  if (isResponse(access)) return access

  return Response.json({
    entries: SOLUTION_CATALOG,
    disclaimer: 'Scope concepts only. No implementation, license, security review, deployment or client isolation has been verified for these entries.',
  }, { headers: { 'Cache-Control': 'private, no-store' } })
}
