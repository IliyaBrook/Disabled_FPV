import type { TLangOptions } from '@/app/types/local.types'
import { getDictionary } from '@/app/utils/dictionaries'
import React from 'react'
import styles from './homePage.module.scss'
import Image from 'next/image'

export default async function HomePage({
  params,
}: {
  params: Promise<{ lang: TLangOptions }>
}): Promise<React.ReactElement> {
  const p = await params
  const dict = getDictionary(p.lang)

  return (
    <div className={styles.homePage}>
      <div className={styles.bgImage}>
        <Image
          src="/img/man_with_drone_main.jpg"
          alt="man controls drone picture"
          fill
          priority
        />
      </div>
    </div>
  )
}
