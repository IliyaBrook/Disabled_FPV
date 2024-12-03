'use client'
import React from 'react'
import styles from './Input.module.scss'

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string
  error?: string
  withError?: boolean
}

const Input: React.FC<InputProps> = ({
  label,
  error,
  withError,
  className,
  ...props
}) => {
  return (
    <div className={`${styles.inputContainer} ${className || ''}`}>
      {label && <label className={styles.label}>{label}</label>}
      <input
        className={`${styles.input} ${error ? styles.errorInput : ''}`}
        {...props}
      />
      <div className={withError ? styles.errorWrapper : undefined}>
        {error && <span className={styles.errorText}>{error}</span>}
      </div>
    </div>
  )
}

export default Input
