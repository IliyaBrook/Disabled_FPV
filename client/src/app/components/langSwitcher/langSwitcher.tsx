'use client'

import type { ILangProps } from '@/app/types'
import { changeUrlSegmentPath } from '@/app/utils/changeUrlSegmentPath'
import Image from 'next/image'
import Link from 'next/link'
import React, { useEffect, useRef, useState } from 'react'
import styles from './langSwitcher.module.scss'

const LangSwitcher: React.FC<Omit<ILangProps, 'dir'>> = ({ dict, lang }) => {
  const [isOpen, setIsOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  const isHe = lang === 'he'

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
        <div
          className={styles.langSwitcherText}
          style={{ marginRight: isHe ? '10px' : 0 }}
        >
          {dict.Language}
        </div>
      </button>
      {isOpen && (
        <div className={styles.dropdownContent}>
          <Link
            href={changeUrlSegmentPath('en')}
            onClick={() => setIsOpen(false)}
          >
            <p>English</p>
          </Link>
          <hr className={styles.separator} />
          <Link
            href={changeUrlSegmentPath('he')}
            onClick={() => setIsOpen(false)}
          >
            <p className={styles.hebLang}>עברית</p>
          </Link>
        </div>
      )}
    </div>
  )
}

export default LangSwitcher
