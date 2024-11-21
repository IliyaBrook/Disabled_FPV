'use client'
import LangSwitcher from '@/app/components/langSwitcher/langSwitcher'
import NavButton from '@/app/components/NavButton/NavButton'
import { useAppSelector } from '@/app/store/hooks'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React from 'react'
import styles from './navBar.module.scss'

export default function NavBar(): React.ReactElement {
  const { lang, dict, dir } = useAppSelector((state) => state.localization)
  const pathname = usePathname()

  const getLinkClass = (href: string): string => {
    const cleanPath = pathname.split('/').slice(2).join('/') || '/'
    return cleanPath === href
      ? `${styles.navLink} ${styles.active}`
      : styles.navLink
  }

  return (
    <nav className={styles.navBar} aria-label="Main Navigation">
      <div className={styles.navBarContent}>
        <div className={styles.logo}>
          <Image
            src="/img/nav_bar_icon.png"
            alt="Disabled FPV Logo"
            width={40}
            height={40}
          />
          <span className={styles.logoText}>Disabled FPV</span>
        </div>
        <ul>
          <li>
            <Link href={`/${lang}/`} className={getLinkClass('/')}>
              {dict?.['Home']}
            </Link>
          </li>
          <li>
            <Link href={`/${lang}/about`} className={getLinkClass('about')}>
              {dict?.['About us']}
            </Link>
          </li>
          <li>
            <Link href={`/${lang}/courses`} className={getLinkClass('courses')}>
              {dict?.['Courses']}
            </Link>
          </li>
          <li>
            <Link href={`/${lang}/shop`} className={getLinkClass('shop')}>
              {dict?.['Shop']}
            </Link>
          </li>
          <li>
            <Link href={`/${lang}/contact`} className={getLinkClass('contact')}>
              {dict?.['Contact']}
            </Link>
          </li>
        </ul>
        <div className={styles.signInUpBtns}>
          <NavButton
            destination={`/${lang}/sign-up`}
            title={dict?.['Sign Up']}
            dir={dir}
          />
          <NavButton
            destination={`/${lang}/sign-in`}
            title={dict?.['Sign In']}
            dir={dir}
          />
        </div>
        <div className={styles.langSwitcher}>
          <LangSwitcher dict={dict} lang={lang} />
        </div>
      </div>
    </nav>
  )
}
