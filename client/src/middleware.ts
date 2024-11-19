import { match } from '@formatjs/intl-localematcher';
import { NextRequest, NextResponse } from 'next/server';
import Negotiator from 'negotiator';

const locales = ['en-US', 'he-IL'];

function getLocale(request: NextRequest): string {
	const negotiatorHeaders = { 'accept-language': request.headers.get('accept-language') || '' };
	const languages = new Negotiator({ headers: negotiatorHeaders }).languages();
	const defaultLocale = 'en-US';
	
	return match(languages, locales, defaultLocale) || defaultLocale;
}

export function middleware(request: NextRequest) {
	const { pathname } = request.nextUrl;
	const pathnameHasLocale = locales.some(
		(locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
	);
	
	if (pathnameHasLocale) return NextResponse.next();
	if (pathname === '/') {
		const locale = getLocale(request);
		return NextResponse.redirect(new URL(`/${locale}`, request.url));
	}
	const locale = getLocale(request);
	const redirectUrl = `/${locale}${pathname}`;
	return NextResponse.redirect(new URL(redirectUrl, request.url));
}

export const config = {
	matcher: [
		'/',
		'/((?!_next).*)',
	],
};
