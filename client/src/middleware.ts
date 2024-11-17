import { NextRequest, NextResponse } from 'next/server'
import Negotiator from 'negotiator';
import { match } from 'node:assert'


const locales = ['en-US', 'nl-NL', 'nl', 'he-IL', 'he']
const defaultLocale = 'en';

// Get the preferred locale, similar to the above or using a library
function getLocale(request: NextRequest): string {
	const negotiator = new Negotiator({
		headers: { 'accept-language': request.headers.get('accept-language') || '' },
	});
	const languages = negotiator.languages();
	return match(languages, locales, defaultLocale);
}


export function middleware(request: NextRequest) {
	// Check if there is any supported locale in the pathname
	const { pathname } = request.nextUrl
	const pathnameHasLocale = locales.some(
		(locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
	)
	
	if (pathnameHasLocale) return
	
	// Redirect if there is no locale
	const locale = getLocale(request)
	request.nextUrl.pathname = `/${locale}${pathname}`
	// e.g. incoming request is /products
	// The new URL is now /en-US/products
	return NextResponse.redirect(request.nextUrl)
}

export const config = {
	matcher: [
		// Skip all internal paths (_next)
		'/((?!_next).*)',
		// Optional: only run on root (/) URL
		// '/'
	],
}