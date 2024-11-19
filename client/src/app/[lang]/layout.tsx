import type { TLangOptions } from '@/app/types/internationalization'
import type { Metadata } from 'next';
import localFont from 'next/font/local';
import React from 'react';

const geistSans = localFont({
	src: './fonts/GeistVF.woff',
	variable: '--font-geist-sans',
	weight: '100 900',
});
const geistMono = localFont({
	src: './fonts/GeistMonoVF.woff',
	variable: '--font-geist-mono',
	weight: '100 900',
});

export const metadata: Metadata = {
	title: 'Disabled FPV - Learn to Build and Fly Drones',
	description: 'Free courses and resources for building and flying FPV drones. Join our community to master FPV drone assembly and control.',
	keywords: [
		'FPV drones',
		'free drone courses',
		'build drones',
		'drone assembly',
		'learn to fly drones',
		'Disabled FPV',
	],
	openGraph: {
		title: 'Disabled FPV - Learn to Build and Fly Drones',
		description: 'Start your journey with FPV drones. Explore free courses and learn how to build and fly drones like a pro.',
		url: 'https://www.disabledfpv.com',
		siteName: 'Disabled FPV',
		images: [
			{
				url: 'https://www.disabledfpv.com/static/images/og-image.jpg',
				width: 1200,
				height: 630,
				alt: 'Disabled FPV - Learn to Build and Fly Drones',
			},
		],
		locale: 'en_US',
		type: 'website',
		alternateLocale: ['he_IL'],
	},
};

export async function generateStaticParams() {
	return [{ lang: 'en-US' }, { lang: 'he-IL' }];
}
export default async function RootLayout({ children, params }: { children: React.ReactNode, params: Promise<{ lang: TLangOptions }>}) {
	const p = await params;
	const dir = p.lang === 'he-IL' ? 'rtl' : 'ltr';
	
	return (
		<html lang={p.lang} dir={dir}>
		<body className={`${geistSans.variable} ${geistMono.variable}`}>
		{children}
		</body>
		</html>
	);
}
