'use client'

import useGetDir from '@/app/hooks/useGetDir'
import Image from 'next/image'
import React, { useEffect, useRef } from 'react'
import styles from './dropDown.module.scss'

interface IDropDown {
  TriggerButtonComponent?: React.ReactElement
  triggerButtonImageUrl?: string
  triggerButtonText?: string
  dropDownElements: React.ReactNode[]
  setModalOpen: (props: boolean) => void
  isModalOpen: boolean
}

const DropDown = ({
  TriggerButtonComponent,
  triggerButtonText,
  triggerButtonImageUrl,
  dropDownElements,
  setModalOpen,
  isModalOpen,
}: IDropDown): React.ReactElement => {
  const dropdownRef = useRef<HTMLDivElement>(null)
  const dir = useGetDir()
  const isRtl = dir === 'rtl'

  const toggleDropdown = (): void => {
    setModalOpen(!isModalOpen)
  }

  const handleClickOutside = (event: MouseEvent): void => {
    if (
      dropdownRef.current &&
      !dropdownRef.current.contains(event.target as Node)
    ) {
      setModalOpen(false)
    }
  }

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  const RenderTriggerButton = (): React.ReactElement => {
    if (TriggerButtonComponent) {
      return TriggerButtonComponent
    } else {
      return (
        <>
          {triggerButtonImageUrl && (
            <Image
              src={triggerButtonImageUrl ?? ''}
              alt={triggerButtonImageUrl}
              width={20}
              height={20}
            />
          )}

          {triggerButtonText && (
            <div
              className={styles.dropDownText}
              style={{ marginRight: isRtl ? '10px' : 0 }}
            >
              {triggerButtonText}
            </div>
          )}
        </>
      )
    }
  }

  const dropdownContentStyles: React.CSSProperties =
    dir === 'rtl'
      ? {
          right: '-10px',
        }
      : {
          left: '-10px',
        }

  return (
    <div className={styles.dropDown} ref={dropdownRef}>
      <button className={styles.dropdownButton} onClick={toggleDropdown}>
        <RenderTriggerButton />
      </button>
      {isModalOpen && (
        <div className={styles.dropdownContent} style={dropdownContentStyles}>
          {dropDownElements.map((element, index) => (
            <div key={index} onClick={toggleDropdown}>
              {element}
              <hr className={styles.separator} />
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default DropDown
