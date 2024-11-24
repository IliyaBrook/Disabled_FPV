'use client'
import type { ILangPageProps } from '@/app/types/pages.types'
import isClient from '@/app/utils/isClient'
import Link from 'next/link'
import React from 'react'
import styles from './signInUpLayout.module.scss'

interface ISignInUpLayoutProps extends ILangPageProps {
  children: React.ReactNode
}

const SignInUpLayout: React.FC<ISignInUpLayoutProps> = ({
  children,
  dictionary,
}): React.ReactElement => {
  const client = isClient()
  const isDesktop = client ? window.innerWidth > 768 : false
  const signInUpLayoutRef = React.useRef<HTMLDivElement>(null)
  const formContainerRef = React.useRef<HTMLDivElement>(null)

  console.log('SignIn', dictionary)
  return (
    <div className={styles.signInUpLayout} ref={signInUpLayoutRef}>
      <div className={styles.modalDesktop}>
        <div className={styles.container} ref={formContainerRef}>
          <div className={styles.formHeader}>
            <h1>Sign Up</h1>
          </div>
          <div className={styles.form}>{children}</div>
          <div className={styles.alreadyHaveBtn}>
            <span>Already have an account?</span>
            <span>{/* <Link href={} /> */}</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SignInUpLayout
