import { match } from '@formatjs/intl-localematcher';
import { NextRequest, NextResponse } from 'next/server';
import Negotiator from 'negotiator';

function getLocale(request: NextRequest): string {
	const negotiatorHeaders = { 'accept-language': request.headers.get('accept-language') || '' };
	const languages = new Negotiator({ headers: negotiatorHeaders }).languages();
	const locales = ['en-US', 'he-IL'];
	const defaultLocale = 'en-US';
	
	return match(languages, locales, defaultLocale) || defaultLocale;
}

export function middleware(request: NextRequest) {
	const { pathname } = request.nextUrl;
	const locales = ['en-US', 'he-IL'];
	
	// Проверяем, есть ли локаль в URL
	const pathnameHasLocale = locales.some(
		(locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
	);
	
	if (pathnameHasLocale) return;
	
	// Определяем локаль и делаем редирект
	const locale = getLocale(request);
	const redirectUrl = `/${locale}${pathname}`;
	return NextResponse.redirect(new URL(redirectUrl, request.url));
}

export const config = {
	matcher: [
		'/((?!_next).*)',
	],
};
