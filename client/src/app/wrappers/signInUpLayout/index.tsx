'use client'
import { Spinner } from '@/app/components/Spinner/Spinner'
import useIsClient from '@/app/hooks/useIsClient'
import useWindowSize from '@/app/hooks/useWindowSize'

import type { ILangProps } from '@/app/types'
import Link from 'next/link'
import React from 'react'
import { createPortal } from 'react-dom'
import styles from './signInUpLayout.module.scss'

interface ISignInUpLayoutProps extends ILangProps {
  children: React.ReactNode
  pageName: 'sign-in' | 'sign-up'
}

const SignInUpLayout: React.FC<ISignInUpLayoutProps> = ({
  children,
  dict,
  lang,
  pageName,
}): React.ReactElement => {
  const isClient: boolean = useIsClient()
  const { screenWidth } = useWindowSize()
  const isDesktop = isClient ? screenWidth > 768 : false
  const signInUpLayoutRef = React.useRef<HTMLDivElement>(null)
  const formContainerRef = React.useRef<HTMLDivElement>(null)
  const portalTarget = isDesktop
    ? formContainerRef.current
    : signInUpLayoutRef.current

  return (
    <div className={styles.signInUpLayout} ref={signInUpLayoutRef}>
      <div className={styles.modalDesktop}>
        <div className={styles.container} ref={formContainerRef}>
          {isClient && portalTarget ? (
            createPortal(
              <>
                <div className={styles.formHeader}>
                  {pageName === 'sign-in' ? (
                    <h1>{dict['Sign In']} </h1>
                  ) : (
                    <h1>{dict['Sign Up']} </h1>
                  )}
                </div>
                <div className={styles.form}>{children}</div>
                {pageName === 'sign-in' ? (
                  <div className={styles.haveAnAccountLink}>
                    <span className={styles.haveAnAccountText}>
                      {dict['Dont have an account?']}
                    </span>
                    <span className={styles.haveAnAccountBtn}>
                      <Link href={`/${lang}/sign-up`}>{dict['Register']}</Link>
                    </span>
                  </div>
                ) : (
                  <div className={styles.haveAnAccountLink}>
                    <span className={styles.haveAnAccountText}>
                      {dict['Already have an account?']}
                    </span>
                    <span className={styles.haveAnAccountBtn}>
                      <Link href={`/${lang}/sign-in`}>{dict['Login']}</Link>
                    </span>
                  </div>
                )}
              </>,
              portalTarget
            )
          ) : (
            <Spinner />
          )}
        </div>
      </div>
    </div>
  )
}

export default SignInUpLayout
