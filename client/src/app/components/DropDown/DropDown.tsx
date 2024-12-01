'use client'

import type { TDict, TDir } from '@/app/types'
import Image from 'next/image'
import React, { useEffect, useRef } from 'react'
import styles from './dropDown.module.scss'

interface IDropDown {
  dict: TDict
  dir: TDir
  TriggerButtonComponent?: React.ReactElement
  triggerButtonImageUrl?: string
  triggerButtonText?: string
  dropDownElements: React.ReactNode[]
  setModalOpen: (props: boolean) => void
  isModalOpen: boolean
}

const DropDown = ({
  dict,
  dir,
  TriggerButtonComponent,
  triggerButtonText,
  triggerButtonImageUrl,
  dropDownElements,
  setModalOpen,
  isModalOpen,
}: IDropDown): React.ReactElement => {
  // const [isOpen, setIsOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

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

  return (
    <div className={styles.dropDown} ref={dropdownRef}>
      <button className={styles.dropdownButton} onClick={toggleDropdown}>
        <RenderTriggerButton />
      </button>
      {isModalOpen && (
        <div className={styles.dropdownContent}>
          {dropDownElements.map((element, index) => (
            <div key={index}>
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
