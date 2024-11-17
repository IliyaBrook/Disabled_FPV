import { NextResponse } from "next/server";
import { match } from "@formatjs/intl-localematcher";
import Negotiator from "negotiator";

const locales = ["en", "he"];
const defaultLocale = "en";

function getLocale(request: Request): string {
	const negotiator = new Negotiator({
		headers: { "accept-language": request.headers.get("accept-language") || "" },
	});
	const languages = negotiator.languages();
	return match(languages, locales, defaultLocale);
}

export function middleware(request: Request) {
	const pathname = new URL(request.url).pathname;
	
	// Проверяем, если маршрут уже содержит язык
	const pathnameIsMissingLocale = locales.every(
		(locale) => !pathname.startsWith(`/${locale}/`) && pathname !== `/${locale}`
	);
	
	if (pathnameIsMissingLocale) {
		const locale = getLocale(request);
		return NextResponse.redirect(new URL(`/${locale}${pathname}`, request.url));
	}
	
	return NextResponse.next(); // Если язык уже в пути, продолжаем обработку
}

export const config = {
	matcher: ["/((?!_next).*)"], // Пропускаем внутренние маршруты Next.js
};
