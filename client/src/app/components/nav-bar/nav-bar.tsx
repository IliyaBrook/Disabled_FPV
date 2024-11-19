'use client'
import LangSwitcher from '@/app/components/LangSwitcher/lang-switcher'
import type { navBarProps } from '@/app/types/components/nav-bar.types'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React from 'react'
import styles from './nav-bar.module.scss'

export default function NavBar({ dict }: navBarProps): React.ReactNode {
  const pathname = usePathname()

  return (
    <nav className={styles.navBar} aria-label="Main Navigation">
      <div className={styles.navBarContent}>
        <div className={styles.logo}></div>
        <ul>
          <li>
            <Link
              href="/"
              className={`${styles.navLink} ${pathname === '/' ? 'active' : ''}`}
            >
              {dict?.['Home']}
            </Link>
          </li>
          <li>
            <Link href="/about" className={styles.navLink}>
              {dict?.['About us']}
            </Link>
          </li>
          <li>
            <Link href="/courses" className={styles.navLink}>
              {dict?.['Courses']}
            </Link>
          </li>
          <li>
            <Link href="/shop" className={styles.navLink}>
              {dict?.['Shop']}
            </Link>
          </li>
          <li>
            <Link href="/contact" className={styles.navLink}>
              {dict?.['Contact']}
            </Link>
          </li>
        </ul>
        <div className={styles.langSwitcher}>
          <LangSwitcher />
        </div>
      </div>
    </nav>
  )
}
