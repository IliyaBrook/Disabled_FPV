'use client'
import styles from '@/app/components/NotFound/notFound.module.scss'
import { useAppSelector } from '@/app/store/hooks'
import { localSelector } from '@/app/store/selectors'
import { useRouter } from 'next/navigation'
import React from 'react'

const NotFound = () => {
  const { dict, lang } = useAppSelector(localSelector)

  const router = useRouter()
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
