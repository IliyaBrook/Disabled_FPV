'use client'

import useOutsideClick from '@/app/hooks/useOutsideClick'
import { useAppSelector } from '@/app/store/hooks'
import { modalSelector } from '@/app/store/selectors'
import { closeModal } from '@/app/store/slices'
import type { TDir } from '@/app/types/shareable.types'
import Image from 'next/image'
import React, { useRef } from 'react'
import { useDispatch } from 'react-redux'
import styles from './alertModal.module.scss'

interface AlertModalProps {
  dir: TDir
}

const AlertModal: React.FC<AlertModalProps> = ({ dir }) => {
  const modalRef = useRef<HTMLDivElement | null>(null)
  const closeButtonRef = useRef<HTMLButtonElement | null>(null)
  const dispatch = useDispatch()

  const {
    isOpen,
    type,
    position = 'center',
    message,
    location,
  } = useAppSelector(modalSelector)

  const onClose = (): void => {
    dispatch(closeModal())
  }

  useOutsideClick(modalRef, onClose)

  const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>): void => {
    if (event.key === 'Escape') {
      onClose()
    }
  }

  if (!isOpen) return null

  return (
    <div
      dir={dir}
      className={`${styles.modal} ${styles[type || 'info']} ${styles[position]}`}
      ref={modalRef}
      role="dialog"
      aria-labelledby="alert-modal-title"
      aria-describedby="alert-modal-message"
      tabIndex={-1}
      onKeyDown={handleKeyDown}
    >
      <header className={styles.header} style={{ justifyContent: 'flex-end' }}>
        <button
          ref={closeButtonRef}
          className={styles.close}
          aria-label="Close modal"
          onClick={onClose}
        >
          <div className={styles.cross}></div>
        </button>
      </header>
      <div className={styles.modalElements}>
        <div className={styles.iconByType}>
          <div className={styles.error}>
            <div className={styles.circle}></div>
          </div>
        </div>
        <div id="alert-modal-message" className={styles.content} dir={dir}>
          <p>{message}</p>
        </div>
      </div>
    </div>
  )
}

export default AlertModal
