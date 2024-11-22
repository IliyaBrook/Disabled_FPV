'use client'
import type { TDir } from '@/app/types/local.types'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import React from 'react'
import styles from './NavButton.module.scss'

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
  return (
    <button
      className={`${styles.navButton} ${dir === 'rtl' ? styles.rtlStyle : {}}`}
      onClick={() => router.push(destination)}
    >
      <span className={styles.title}>{title}</span>
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
