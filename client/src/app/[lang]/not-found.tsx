import type { ILangProps } from '@/app/types'
import { getDictionary } from '@/app/utils/dictionaries'
import { redirect } from 'next/navigation'
import React from 'react'
import styles from './notFound.module.scss'

export default async function NotFound({
  lang,
}: Omit<ILangProps, 'dict'>): Promise<React.ReactElement> {
  const dict = await getDictionary(lang)
  return (
    <div className={styles.container}>
      <h1>{dict['Page Not Found']}</h1>
      <p>{dict['The page you are looking for does not exist.']}</p>
      <button className={styles.button} onClick={() => redirect(`/${lang}`)}>
        {dict['Go to Home Page']}
      </button>
    </div>
  )
}
