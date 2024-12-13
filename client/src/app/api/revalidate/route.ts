import { revalidateTag } from 'next/cache'
import type { NextRequest } from 'next/server'

export async function GET(request: NextRequest) {
  const tag = request.nextUrl.searchParams.get('tag')
  if (typeof tag === 'string') {
    revalidateTag(tag)
  }
  return Response.json({ revalidated: true, now: Date.now() })
}
