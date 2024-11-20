import NavBar from '@/app/components/nav-bar/nav-bar'
import { getDictionary } from '@/app/dictionaries'
import type { TLangOptions } from '@/app/types/local.types'
import type { Metadata } from 'next'
import React from 'react'
import { Sora, Josefin_Sans } from 'next/font/google'
import './globals.scss'
// import localFont from 'next/font/local';
// const geistMono = localFont({
// 	src: './fonts/GeistMonoVF.woff',
// 	variable: '--font-geist-mono',
// 	weight: '100 900',
// });
// ${geistMono.variable}

const sora = Sora({
  subsets: ['latin'],
  weight: '400',
  display: 'swap',
  variable: '--font-sora-sans',
})

const josefinSans = Josefin_Sans({
  subsets: ['latin'],
  weight: '400',
  display: 'swap',
  variable: '--font-josefin-sans',
})

export const metadata: Metadata = {
  title: 'Disabled FPV - Learn to Build and Fly Drones',
  description:
    'Free courses and resources for building and flying FPV drones. Join our community to master FPV drone assembly and control.',
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
    description:
      'Start your journey with FPV drones. Explore free courses and learn how to build and fly drones like a pro.',
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
}

export async function generateStaticParams(): Promise<
  { lang: TLangOptions }[]
> {
  return [{ lang: 'en' }, { lang: 'he' }]
}

export default async function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: Promise<{ lang: TLangOptions }>
}): Promise<React.ReactNode> {
  const p = await params
  const dir = p.lang === 'he' ? 'rtl' : 'ltr'
  const dict = await getDictionary(p.lang)
  return (
    <html
      lang={p.lang}
      dir={dir}
      className={`${sora.variable} ${josefinSans.variable}`}
    >
      <body>
        <NavBar lang={p.lang} dict={dict} />
        {children}
      </body>
    </html>
  )
}
