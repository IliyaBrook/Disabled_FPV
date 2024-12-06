'use client'
import React from 'react'
import styles from './notFound.module.scss'

export default async function NotFound(): Promise<React.ReactElement> {
  // const { dict, lang } = useAppSelector(localSelector)
  // const router = useRouter()
  return (
    <div className={styles.container}>
      {/* <h1>{dict['Page Not Found']}</h1> */}
      {/* <p>{dict['The page you are looking for does not exist.']}</p> */}
      {/* <button className={styles.button} onClick={() => router.push(`/${lang}`)}> */}
      {/*   {dict['Go to Home Page']} */}
      {/* </button> */}
    </div>
  )
}
