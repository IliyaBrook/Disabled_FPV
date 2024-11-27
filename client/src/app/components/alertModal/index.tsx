'use client'

import useIsClient from '@/app/hooks/useIsClient'
import useOutsideClick from '@/app/hooks/useOutsideClick'
import { useAppSelector } from '@/app/store/hooks'
import { modalSelector } from '@/app/store/selectors'
import { closeModal } from '@/app/store/slices'
import type { TDir } from '@/app/types/shareable.types'
import React, { useRef } from 'react'
import { createPortal } from 'react-dom'
import { useDispatch } from 'react-redux'
import styles from './alertModal.module.scss'

interface AlertModalProps {
  dir: TDir
}

const AlertModal: React.FC<AlertModalProps> = ({ dir }) => {
  const modalRef = useRef<HTMLDivElement | null>(null)
  const closeButtonRef = useRef<HTMLButtonElement | null>(null)
  const dispatch = useDispatch()
  const isClient: boolean = useIsClient()
  const {
    isOpen,
    position = 'center',
    message,
    type,
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

  const body = document.querySelector('body')

  return (
    <>
      {isClient &&
        body &&
        createPortal(
          <div
            dir={dir}
            className={`${styles.modal} ${styles[position]}`}
            ref={modalRef}
            role="dialog"
            aria-labelledby="alert-modal-title"
            aria-describedby="alert-modal-message"
            tabIndex={-1}
            onKeyDown={handleKeyDown}
          >
            <header className={styles.header}>
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
                <div className={styles[type]}></div>
              </div>
              <div className={styles.content} dir={dir}>
                <p>{message}</p>
              </div>
            </div>
          </div>,
          body
        )}
    </>
  )
}

export default AlertModal
