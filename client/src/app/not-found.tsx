'use client'

import { useRouter } from 'next/navigation'
import React from 'react'
import styles from './notFound.module.scss'

const NotFound: React.FC = () => {
  const router = useRouter()
  return (
    <div className={styles.container}>
      <h1>Page Not Found</h1>
      <p>The page you are looking for does not exist.</p>
      <button className={styles.button} onClick={() => router.push(`/en`)}>
        Go to Home Page
      </button>
    </div>
  )
}

export default NotFound
