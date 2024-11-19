'use client'

import React from 'react'
import { useRouter } from 'next/navigation'
import { usePathname } from 'next/navigation'
import styles from './lang-switcher.module.scss'

const LangSwitcher: React.FC = () => {
  const router = useRouter()
  const pathname = usePathname()

  const changeLanguage = async (lang: string): Promise<void> => {
    const segments = pathname.split('/')
    segments[1] = lang
    const newPath = segments.join('/')
    router.push(newPath)
  }

  return (
    <div className={styles.langSwitcher}>
      <button className={styles.dropdownButton}>Language</button>
      <div className={styles.dropdownContent}>
        <a href="#" onClick={() => changeLanguage('en')}>
          English
        </a>
        <a href="#" onClick={() => changeLanguage('he')}>
          Hebrew
        </a>
      </div>
    </div>
  )
}

export default LangSwitcher
