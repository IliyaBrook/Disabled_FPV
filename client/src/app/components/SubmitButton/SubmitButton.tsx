import useGetDir from '@/app/hooks/useGetDir'
import React, { type ButtonHTMLAttributes } from 'react'
import { useFormStatus } from 'react-dom'
import styles from './SubmitButton.module.scss'

interface SubmitButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string
}

const SubmitButton: React.FC<SubmitButtonProps> = ({
  className,
  children,
  ...props
}) => {
  const dir = useGetDir()
  const { pending } = useFormStatus()
  const isRtl = dir === 'rtl'
  return (
    <button
      className={`${styles.submitButton} ${pending ? styles.loading : ''} ${className || ''}`}
      disabled={pending}
      {...props}
      style={{
        paddingLeft: isRtl ? 0 : '2rem',
        paddingRight: isRtl ? '2rem' : 0,
      }}
    >
      <div className={styles.text}>{children || 'Submit'}</div>
      <span className={styles.loaderWrapper}>
        {pending && <span className={styles.loader} />}
      </span>
    </button>
  )
}

export default SubmitButton
