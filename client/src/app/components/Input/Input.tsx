'use client'
import React from 'react'
import styles from './Input.module.scss'

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string
  error?: string
}

const Input: React.FC<InputProps> = ({ label, error, className, ...props }) => {
  return (
    <div className={`${styles.inputContainer} ${className || ''}`}>
      {label && <label className={styles.label}>{label}</label>}
      <input
        className={`${styles.input} ${error ? styles.errorInput : ''}`}
        {...props}
      />
      {error && <span className={styles.errorText}>{error}</span>}
    </div>
  )
}

export default Input
