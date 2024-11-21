'use client'

import React from 'react'
import { useRouter } from 'next/navigation'
import { useAppSelector } from '@/app/store/hooks'
import styles from './notFound.module.scss'

function NotFound(): React.ReactElement {
  const router = useRouter()
  const { lang, dict } = useAppSelector((state) => state.localization)

  return (
    <div className={styles.container}>
      <h1>{dict['Page Not Found']}</h1>
      <p>{dict['The page you are looking for does not exist.']}</p>
      <button className={styles.button} onClick={() => router.push(`/${lang}`)}>
        {dict['Go to Home Page']}
      </button>
    </div>
  )
}

export default NotFound
