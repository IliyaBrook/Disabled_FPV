import { getDictionary } from '@/app/dictionaries'
import type { TLangOptions } from '@/app/types/local.types'
import React from 'react'

export default async function Page(props: {
  params: Promise<{ lang: TLangOptions }>
}): Promise<React.ReactNode> {
  const params = await props.params

  const { lang } = params

  const dict = await getDictionary(lang) // en

  return <button>{dict['Add to Cart']}</button>
}
