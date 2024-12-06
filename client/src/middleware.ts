import { match } from '@formatjs/intl-localematcher'
import Negotiator from 'negotiator'
import type { NextRequest } from 'next/server'
import { NextResponse } from 'next/server'

const locales = ['en', 'he']

function getLocale(request: NextRequest): string {
  const negotiatorHeaders = {
    'accept-language': request.headers.get('accept-language') || '',
  }
  const languages = new Negotiator({ headers: negotiatorHeaders }).languages()
  const defaultLocale = 'en'

  return match(languages, locales, defaultLocale) || defaultLocale
}

export async function middleware(request: NextRequest): Promise<NextResponse> {
  const { pathname } = request.nextUrl
  if (
    pathname.startsWith('/_next') ||
    pathname.startsWith('/api') ||
    pathname.startsWith('/favicon.ico') ||
    pathname.startsWith('/img')
  ) {
    return NextResponse.next()
  }
  const locale = getLocale(request)
  const pathnameHasLocale = locales.some(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  )

  if (pathnameHasLocale) {
    return NextResponse.next()
  }

  if (pathname === '/') {
    return NextResponse.redirect(new URL(`/${locale}`, request.url))
  }

  return NextResponse.redirect(new URL(`/${locale}${pathname}`, request.url))
}

export const config = {
  matcher: ['/:path*'],
}
