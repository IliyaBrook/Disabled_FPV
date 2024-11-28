'use client'
import ButtonWithArrow from '@/app/components/ButtonWithArrow/ButtonWithArrow'
import LangSwitcher from '@/app/components/langSwitcher/langSwitcher'
import useOutsideClick from '@/app/hooks/useOutsideClick'
import useWindowSize from '@/app/hooks/useWindowSize'
import { useAppDispatch, useAppSelector } from '@/app/store/hooks'
import { userDataWithLocalSelector } from '@/app/store/selectors'
import { setModal } from '@/app/store/slices'
import { useLogOutMutation } from '@/app/store/thunks'
import isClient from '@/app/utils/isClient'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import React, { useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import styles from './navBar.module.scss'

export default function NavBar(): React.ReactElement {
  const dispatch = useAppDispatch()
  const { authUser, lang, dir, dict } = useAppSelector(
    userDataWithLocalSelector
  )

  // const data2 = useAppSelector(userDataWithLocalSelector)

  const [fetchLogOut] = useLogOutMutation()
  const router = useRouter()
  const isAuth = !!authUser

  const pathname = usePathname()
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const menuRef = useRef<HTMLDivElement>(null)
  const signInUpBtnsDesktopRef = useRef<HTMLDivElement>(null)
  const buttonFirstRef = useRef<HTMLLIElement>(null)
  const buttonSecondRef = useRef<HTMLLIElement>(null)

  const getLinkClass = (href: string): string => {
    const cleanPath = pathname.split('/').slice(2).join('/') || '/'
    return cleanPath === href
      ? `${styles.navLink} ${styles.active}`
      : styles.navLink
  }

  const toggleMenu = (): void => setIsMenuOpen((prev) => !prev)

  useOutsideClick(menuRef, () => setIsMenuOpen(false))

  useEffect(() => {
    setIsMenuOpen(false)
  }, [pathname])

  const { screenWidth } = useWindowSize()
  const buttonFirstTarget = isClient()
    ? screenWidth > 768
      ? signInUpBtnsDesktopRef.current
      : buttonFirstRef.current
    : null
  const buttonSecondTarget = isClient()
    ? screenWidth > 768
      ? signInUpBtnsDesktopRef.current
      : buttonSecondRef.current
    : null

  const onLogout = (): void => {
    fetchLogOut().then(() => {
      dispatch(
        setModal({
          isOpen: true,
          message: dict?.['You have been successfully logged out'],
          type: 'success',
        })
      )
      setTimeout(() => {
        window.location.href = '/'
      }, 3000)
    })
  }
  const onMyCoursesClick = (): void => {
    if (authUser?.id) {
      router.push(`/courses/${authUser.id}`)
    }
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
          <li className={styles.signUpMobile} ref={buttonFirstRef}></li>
          <li className={styles.signInMobile} ref={buttonSecondRef}></li>
          {/* {!isAuth ? ( */}
          {/*   <> */}
          {/*     <li className={styles.signUpMobile} ref={buttonFirstRef}></li> */}
          {/*     <li className={styles.signInMobile} ref={buttonSecondRef}></li> */}
          {/*   </> */}
          {/* ) : ( */}
          {/*   <> */}
          {/*     <li className={styles.logOutMobile} ref={buttonSecondRef}></li> */}
          {/*   </> */}
          {/* )} */}
        </ul>
        <div className={styles.signInUpBtns} ref={signInUpBtnsDesktopRef}>
          {!isAuth ? (
            <>
              {buttonFirstTarget &&
                createPortal(
                  <ButtonWithArrow
                    destination={`/${lang}/sign-up`}
                    title={dict?.['Sign Up']}
                    dir={dir}
                    className={styles.buttonWithArrow}
                  />,
                  buttonFirstTarget
                )}
              {buttonSecondTarget &&
                createPortal(
                  <ButtonWithArrow
                    destination={`/${lang}/sign-in`}
                    title={dict?.['Sign In']}
                    dir={dir}
                    className={styles.buttonWithArrow}
                  />,
                  buttonSecondTarget
                )}
            </>
          ) : (
            <>
              {buttonFirstTarget &&
                createPortal(
                  <ButtonWithArrow
                    logic="onClick"
                    title={dict?.['Log Out']}
                    dir={dir}
                    className={`${styles.buttonWithArrow} ${styles.logOut}`}
                    backgroundColor="#d32f2f"
                    onClick={onLogout}
                  />,
                  buttonFirstTarget
                )}
              {buttonSecondTarget &&
                createPortal(
                  <ButtonWithArrow
                    logic="onClick"
                    title={dict?.['My'].concat(' ', dict?.['Courses'])}
                    dir={dir}
                    className={`${styles.buttonWithArrow} ${styles.myCourses}`}
                    backgroundColor="#d32f2f"
                    onClick={onMyCoursesClick}
                  />,
                  buttonSecondTarget
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
