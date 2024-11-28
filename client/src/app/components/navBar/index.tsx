'use client'
import ButtonWithArrow from '@/app/components/ButtonWithArrow/ButtonWithArrow'
import LangSwitcher from '@/app/components/langSwitcher/langSwitcher'
import useWindowSize from '@/app/hooks/useWindowSize'
import { useAppDispatch, useAppSelector } from '@/app/store/hooks'
import { userDataWithLocalSelector } from '@/app/store/selectors'
import { setModal } from '@/app/store/slices'
import { useLogOutMutation } from '@/app/store/thunks'
import isClient from '@/app/utils/isClient'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React, { useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import styles from './navBar.module.scss'

export default function NavBar(): React.ReactElement {
  const { lang, dict, dir } = useAppSelector((state) => state.localization)
  const dispatch = useAppDispatch()
  const data = useAppSelector(userDataWithLocalSelector)
  const [fetchLogOut] = useLogOutMutation()
  const isAuth = !!data.authUser

  const pathname = usePathname()
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const menuRef = useRef<HTMLDivElement>(null)
  const signInUpBtnsDesktopRef = useRef<HTMLDivElement>(null)
  const signUpMobileRef = useRef<HTMLLIElement>(null)
  const signInMobileRef = useRef<HTMLLIElement>(null)
  const logOutMobileRef = useRef<HTMLLIElement>(null)

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
    document.addEventListener('mousedown', handleOutsideClick)

    return () => {
      document.removeEventListener('mousedown', handleOutsideClick)
    }
  }, [])
  const { screenWidth } = useWindowSize()
  const signUpTarget = isClient()
    ? screenWidth > 768
      ? signInUpBtnsDesktopRef.current
      : signUpMobileRef.current
    : null
  const signInTarget = isClient()
    ? screenWidth > 768
      ? signInUpBtnsDesktopRef.current
      : signInMobileRef.current
    : null
  const logOutTarget = isClient()
    ? screenWidth > 768
      ? signInUpBtnsDesktopRef.current
      : signInMobileRef.current
    : null

  const onLogout = (): void => {
    fetchLogOut().then(() => {
      dispatch(
        setModal({
          isOpen: true,
          message: dict['You have been successfully logged out'],
          type: 'success',
        })
      )
      setTimeout(() => {
        window.location.href = '/'
      }, 3000)
    })
  }

  return (
    <nav className={styles.navBar} aria-label="Main Navigation" id="navBar">
      <div className={styles.navBarContent} ref={menuRef}>
        <div className={styles.logo}>
          <Image
            src="/img/nav_bar_logo.svg"
            alt="Disabled FPV Logo"
            width={35}
            height={35}
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
            <Link href={`/${lang}/`}>{dict['Home']}</Link>
          </li>
          <li className={getLinkClass('about')}>
            <Link href={`/${lang}/about`}>{dict['About us']}</Link>
          </li>
          <li className={getLinkClass('courses')}>
            <Link href={`/${lang}/courses`}>{dict['Courses']}</Link>
          </li>
          <li className={getLinkClass('shop')}>
            <Link href={`/${lang}/shop`}>{dict['Shop']}</Link>
          </li>
          <li className={getLinkClass('contact')}>
            <Link href={`/${lang}/contact`}>{dict['Contact']}</Link>
          </li>
          {!isAuth ? (
            <>
              <li className={styles.signUpMobile} ref={signUpMobileRef}></li>
              <li className={styles.signInMobile} ref={signInMobileRef}></li>
            </>
          ) : (
            <li className={styles.logOutMobile} ref={logOutMobileRef}></li>
          )}
        </ul>
        <div className={styles.signInUpBtns} ref={signInUpBtnsDesktopRef}>
          {!isAuth ? (
            <>
              {signUpTarget &&
                createPortal(
                  <ButtonWithArrow
                    destination={`/${lang}/sign-up`}
                    title={dict['Sign Up']}
                    dir={dir}
                    className={styles.buttonWithArrow}
                  />,
                  signUpTarget
                )}
              {signInTarget &&
                createPortal(
                  <ButtonWithArrow
                    destination={`/${lang}/sign-in`}
                    title={dict['Sign In']}
                    dir={dir}
                    className={styles.buttonWithArrow}
                  />,
                  signInTarget
                )}
            </>
          ) : (
            <>
              {logOutTarget &&
                createPortal(
                  <ButtonWithArrow
                    logic="onClick"
                    title={dict['Log Out']}
                    dir={dir}
                    className={`${styles.buttonWithArrow} ${styles.logOut}`}
                    backgroundColor="#d32f2f"
                    onClick={onLogout}
                  />,
                  logOutTarget
                )}
            </>
          )}
        </div>
        <div className={styles.langSwitcher}>
          <LangSwitcher dict={dict} lang={lang} />
        </div>
      </div>
    </nav>
  )
}
