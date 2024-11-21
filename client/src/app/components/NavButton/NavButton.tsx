'use client'
import type { TDir } from '@/app/types/local.types'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import styles from './NavButton.module.scss'
import React, { type CSSProperties } from 'react'

interface IButtonProps {
  destination: string
  title: string
  dir: TDir
}

const NavButton = ({
  destination,
  title,
  dir,
}: IButtonProps): React.ReactElement => {
  const router = useRouter()
  const rtlStyles: CSSProperties | undefined =
    dir === 'rtl' ? { flexDirection: 'row-reverse' } : {}
  return (
    <button
      className={styles.navButton}
      onClick={() => router.push(destination)}
      style={rtlStyles}
    >
      <span>{title}</span>
      <span className={styles.arrowWrapper}>
        <Image
          src="/img/arrow_right.svg"
          alt="Disabled FPV Logo"
          width={20}
          height={20}
        />
      </span>
    </button>
  )
}

export default NavButton
