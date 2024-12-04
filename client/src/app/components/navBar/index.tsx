'use client'
import ButtonWithArrow from '@/app/components/ButtonWithArrow/ButtonWithArrow'
import DropDown from '@/app/components/DropDown/DropDown'
import useOutsideClick from '@/app/hooks/useOutsideClick'
import useWindowSize from '@/app/hooks/useWindowSize'
import { useAppSelector } from '@/app/store/hooks'
import { userDataWithLocalSelector } from '@/app/store/selectors'
import { useLogOutMutation } from '@/app/store/thunks'
import { changeUrlSegmentPath } from '@/app/utils/changeUrlSegmentPath'
import isClient from '@/app/utils/isClient'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import React, { useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import styles from './navBar.module.scss'

export default function NavBar(): React.ReactElement {
  const menuRef = useRef<HTMLDivElement>(null)
  const signInUpBtnsDesktopRef = useRef<HTMLDivElement>(null)
  const buttonFirstRef = useRef<HTMLLIElement>(null)
  const buttonSecondRef = useRef<HTMLLIElement>(null)

  const { authUser, lang, dir, dict } = useAppSelector(
    userDataWithLocalSelector
  )

  const [fetchLogOut] = useLogOutMutation()
  const router = useRouter()

  const pathname = usePathname()
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isLangDropdownOpen, setLangDropDownOpen] = useState(false)
  const [isDropdownOpen, setDropDownOpen] = useState(false)

  useOutsideClick(menuRef, () => setIsMenuOpen(false))
  const { screenWidth } = useWindowSize()
  const isDesktop = screenWidth > 768

  const isAuth = !!authUser
  const isAdmin = isAuth && authUser?.role === 'admin'
  const userId = isAuth && authUser?.id

  const getLinkClass = (href: string): string => {
    const cleanPath = pathname.split('/').slice(2).join('/') || '/'
    return cleanPath === href
      ? `${styles.navLink} ${styles.active}`
      : styles.navLink
  }

  const toggleMenu = (): void => setIsMenuOpen((prev) => !prev)

  useEffect(() => {
    setIsMenuOpen(false)
  }, [pathname])

  const buttonFirstTarget = isClient()
    ? isDesktop
      ? signInUpBtnsDesktopRef.current
      : buttonFirstRef.current
    : null
  const buttonSecondTarget = isClient()
    ? isDesktop
      ? signInUpBtnsDesktopRef.current
      : buttonSecondRef.current
    : null

  const onMyCoursesClick = (): void => {
    if (authUser?.id) {
      router.push(`/courses/${authUser.id}`)
    }
  }
  const profileRoute = (
    <Link key="profileRoute" href={`/profile/${userId}`}>
      <p>{dict['User Settings']}</p>
    </Link>
  )
  const adminUserDropDown: React.ReactNode[] = [
    profileRoute,
    <Link key="profileRoute" href={`/admin/courses/create`}>
      <p>{dict['Add Course']}</p>
    </Link>,
  ]
  const userDropDown: React.ReactNode[] = [profileRoute]

  const renderLogo = (
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
  )

  const renderDropDown = (
    <DropDown
      isModalOpen={isDropdownOpen}
      setModalOpen={setDropDownOpen}
      dir={dir}
      dropDownElements={isAdmin ? adminUserDropDown : userDropDown}
      TriggerButtonComponent={
        <Image
          src="/img/menu.svg"
          alt="Disabled FPV Logo"
          width={30}
          height={30}
          className={styles.logoImg}
        />
      }
      triggerButtonImageUrl="/img/menu.svg"
    />
  )

  return (
    <nav className={styles.navBar} aria-label="Main Navigation" id="navBar">
      <div className={styles.navBarContent} ref={menuRef}>
        <div className={styles.logo}>
          {!isAuth || !isDesktop ? renderLogo : renderDropDown}
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
                    backgroundColor={isDesktop ? '#d32f2f' : ''}
                    onClick={() => fetchLogOut()}
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
                    backgroundColor={isDesktop ? '#1677ff' : ''}
                    onClick={onMyCoursesClick}
                  />,
                  buttonSecondTarget
                )}
            </>
          )}
        </div>
        <div className={styles.langSwitcher}>
          <DropDown
            isModalOpen={isLangDropdownOpen}
            setModalOpen={setLangDropDownOpen}
            dir={dir}
            dropDownElements={[
              <Link
                key="en"
                href={changeUrlSegmentPath('en')}
                onClick={() => setLangDropDownOpen(false)}
              >
                <p>English</p>
              </Link>,
              <Link
                key="he"
                href={changeUrlSegmentPath('he')}
                onClick={() => setLangDropDownOpen(false)}
              >
                <p>עברית</p>
              </Link>,
            ]}
            triggerButtonImageUrl="/img/lang_icon.svg"
            triggerButtonText={dict.Language}
          />
        </div>
      </div>
    </nav>
  )
}
