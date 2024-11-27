import type { TDir } from '@/app/types'
import type { ButtonHTMLAttributes } from 'react'
import React from 'react'
import { useFormStatus } from 'react-dom'
import styles from './SubmitButton.module.scss'

interface SubmitButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string
  dir?: TDir
}

const SubmitButton: React.FC<SubmitButtonProps> = ({
  className,
  children,
  dir,
  ...props
}) => {
  const { pending } = useFormStatus()
  const isRtl = dir === 'rtl'
  return (
    <button
      className={`${styles.submitButton} ${pending ? styles.loading : ''} ${className || ''}`}
      disabled={pending}
      {...props}
      style={{ paddingLeft: isRtl ? 0 : '3rem' }}
    >
      <span className={styles.text}>{children || 'Submit'}</span>
      <span className={styles.loaderWrapper}>
        {pending && <span className={styles.loader} />}
      </span>
    </button>
  )
}

export default SubmitButton
