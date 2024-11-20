import { getDictionary } from '@/app/dictionaries'
import type { TLangOptions } from '@/app/types/local.types'
import React from 'react'

export default async function CoursesPage(props: {
  params: Promise<{ lang: TLangOptions }>
}): Promise<React.ReactNode> {
  const params = await props.params

  const { lang } = params

  // noinspection JSUnusedLocalSymbols
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const dict = await getDictionary(lang) // en

  return (
    <div>
      <h1>Courses page</h1>
    </div>
  )
}
