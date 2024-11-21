'use client'
import React, { useEffect, useRef, useState } from 'react'
import LangSwitcher from '@/app/components/langSwitcher/langSwitcher'
import NavButton from '@/app/components/NavButton/NavButton'
import { useAppSelector } from '@/app/store/hooks'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { createPortal } from 'react-dom'
import styles from './navBar.module.scss'

export default function NavBar(): React.ReactElement {
  const { lang, dict, dir } = useAppSelector((state) => state.localization)
  const pathname = usePathname()
  const [isClient, setIsClient] = useState(false)
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const menuRef = useRef<HTMLDivElement>(null)
  const signInUpBtnsDesktopRef = useRef<HTMLDivElement>(null)
  const signUpMobileRef = useRef<HTMLLIElement>(null)
  const signInMobileRef = useRef<HTMLLIElement>(null)

  const getLinkClass = (href: string): string => {
    const cleanPath = pathname.split('/').slice(2).join('/') || '/'
    return cleanPath === href
      ? `${styles.navLink} ${styles.active}`
      : styles.navLink
  }

  const toggleMenu = (): void => setIsMenuOpen((prev) => !prev)

  const handleOutsideClick = (event: MouseEvent): void => {
    if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
      setIsMenuOpen(false)
    }
  }

  useEffect(() => {
    setIsMenuOpen(false)
  }, [pathname])

  useEffect(() => {
    setIsClient(true)
    document.addEventListener('mousedown', handleOutsideClick)
    return () => {
      document.removeEventListener('mousedown', handleOutsideClick)
    }
  }, [])

  const signUpTarget = isClient
    ? window.innerWidth > 768
      ? signInUpBtnsDesktopRef.current
      : signUpMobileRef.current
    : null
  const signInTarget = isClient
    ? window.innerWidth > 768
      ? signInUpBtnsDesktopRef.current
      : signInMobileRef.current
    : null

  return (
    <nav className={styles.navBar} aria-label="Main Navigation">
      <div className={styles.navBarContent} ref={menuRef}>
        <div className={styles.logo}>
          <Image
            src="/img/nav_bar_icon.png"
            alt="Disabled FPV Logo"
            width={40}
            height={40}
            className={styles.logoImg}
          />
          <span className={styles.logoText}>Disabled FPV</span>
        </div>
        <button
          className={styles.burgerMenu}
          onClick={toggleMenu}
          aria-label="Toggle navigation"
        >
          <span />
          <span />
          <span />
        </button>
        <ul className={`${styles.navLinks} ${isMenuOpen ? styles.open : ''}`}>
          <li className={getLinkClass('/')}>
            <Link href={`/${lang}/`}>{dict?.['Home']}</Link>
          </li>
          <li className={getLinkClass('about')}>
            <Link href={`/${lang}/about`}>{dict?.['About us']}</Link>
          </li>
          <li className={getLinkClass('courses')}>
            <Link href={`/${lang}/courses`}>{dict?.['Courses']}</Link>
          </li>
          <li className={getLinkClass('shop')}>
            <Link href={`/${lang}/shop`}>{dict?.['Shop']}</Link>
          </li>
          <li className={getLinkClass('contact')}>
            <Link href={`/${lang}/contact`}>{dict?.['Contact']}</Link>
          </li>
          <li className={`${styles.signUpMobile}`} ref={signUpMobileRef}></li>
          <li className={styles.signInMobile} ref={signInMobileRef}></li>
        </ul>
        <div className={styles.signInUpBtns} ref={signInUpBtnsDesktopRef}>
          {signUpTarget &&
            createPortal(
              <NavButton
                destination={`/${lang}/sign-up`}
                title={dict?.['Sign Up']}
                dir={dir}
              />,
              signUpTarget
            )}
          {signInTarget &&
            createPortal(
              <NavButton
                destination={`/${lang}/sign-in`}
                title={dict?.['Sign In']}
                dir={dir}
              />,
              signInTarget
            )}
        </div>
        <div className={styles.langSwitcher}>
          <LangSwitcher dict={dict} lang={lang} />
        </div>
      </div>
    </nav>
  )
}
