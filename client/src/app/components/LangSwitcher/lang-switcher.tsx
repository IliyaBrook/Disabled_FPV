'use client'

import type { TDict } from '@/app/types/local.types'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React, { useEffect, useRef, useState } from 'react'
import styles from './lang-switcher.module.scss'

const LangSwitcher: React.FC<{ dict: TDict }> = ({ dict }) => {
  const pathname = usePathname()
  const [isOpen, setIsOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  const buildNewPath = (lang: string): string => {
    const segments = pathname.split('/').filter(Boolean)
    segments[0] = lang
    return `/${segments.join('/')}`
  }

  const toggleDropdown = (): void => {
    setIsOpen((prev) => !prev)
  }

  const handleClickOutside = (event: MouseEvent): void => {
    if (
      dropdownRef.current &&
      !dropdownRef.current.contains(event.target as Node)
    ) {
      setIsOpen(false)
    }
  }

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  return (
    <div className={styles.langSwitcher} ref={dropdownRef}>
      <button className={styles.dropdownButton} onClick={toggleDropdown}>
        <Image
          src="/img/lang_icon.svg"
          alt="Disabled FPV Logo"
          width={20}
          height={20}
        />
        <div className={styles.langSwitcherText}>{dict.Language}</div>
      </button>
      {isOpen && (
        <div className={styles.dropdownContent}>
          <Link href={buildNewPath('en')} onClick={() => setIsOpen(false)}>
            {dict.English}
          </Link>
          <Link href={buildNewPath('he')} onClick={() => setIsOpen(false)}>
            {dict.Hebrew}
          </Link>
        </div>
      )}
    </div>
  )
}

export default LangSwitcher
