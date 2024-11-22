import { useAppSelector } from '@/app/store/hooks'
import type { TLangOptions } from '@/app/types/local.types'
import { getDictionary } from '@/app/utils/dictionaries'
import React from 'react'
import styles from './homePage.module.scss'

export default async function HomePage({
  params,
}: {
  params: Promise<{ lang: TLangOptions }>
}): Promise<React.ReactElement> {
  const p = await params
  const dict = getDictionary(p.lang)

  // const { dict, dir, lang } = useAppSelector((state) => state.localization)
  return (
    <div className={styles.homePage}>
      <h1>Home page</h1>
    </div>
  )
}
