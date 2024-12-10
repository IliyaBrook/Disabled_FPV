import AlertModal from '@/app/components/alertModal'
import Footer from '@/app/components/footer/footer'

import NavBar from '@/app/components/navBar'
import { Spinner } from '@/app/components/Spinner/Spinner'
import type { TDir, TLangOptions } from '@/app/types'
import StoreProviderWrapper from '@/app/wrappers/storeProvider'
import type { Metadata } from 'next'
import { Josefin_Sans, Sora } from 'next/font/google'
import '../globalStyles/globals.scss'
import React, { Suspense } from 'react'

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

async function AsyncDictionaryLoader({ lang }: { lang: TLangOptions }) {
  const { getDictionary } = await import('@/app/utils/dictionaries')
  const { default: Initializer } = await import('@/app/components/Initializer')

  const dict = await getDictionary(lang)

  return <Initializer lang={lang} dict={dict} />
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
  const dir: TDir = p.lang === 'he' ? 'rtl' : 'ltr'
  return (
    <html
      lang={p.lang}
      dir={dir}
      className={`${sora.variable} ${josefinSans.variable}`}
    >
      <body>
        <StoreProviderWrapper>
          <NavBar />
          <Suspense fallback={<Spinner />}>
            <AsyncDictionaryLoader lang={p.lang} />
            <div className="pagesWrapper">{children}</div>
          </Suspense>
          <Footer />
          <AlertModal />
        </StoreProviderWrapper>
      </body>
    </html>
  )
}
