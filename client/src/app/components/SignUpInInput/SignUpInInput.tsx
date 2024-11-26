'use client'
import React, { useState } from 'react'
import Image from 'next/image'
import useWindowSize from '@/app/hooks/useWindowSize'
import styles from './signUpInInput.module.scss'
import isClient from '@/app/utils/isClient'

interface ISignUpInInputProps {
  type: 'email' | 'password' | 'text'
  placeholder: string
  name: string
  defaultValue?: string
}

const SignUpInInput: React.FC<ISignUpInInputProps> = ({
  type,
  placeholder,
  name,
  defaultValue,
}) => {
  const { screenWidth } = useWindowSize()
  const isDesktop = isClient() ? screenWidth > 768 : false

  const [isPasswordVisible, setIsPasswordVisible] = useState(false)

  const handleTogglePasswordVisibility = (): void => {
    setIsPasswordVisible((prev) => !prev)
  }

  return (
    <div
      className={`${styles.inputWrapper} ${
        isDesktop ? styles.desktop : styles.mobile
      }`}
    >
      <input
        type={type === 'password' && !isPasswordVisible ? 'password' : 'text'}
        placeholder={placeholder}
        className={styles.input}
        name={name}
        defaultValue={defaultValue}
      />
      {type === 'password' && (
        <button
          type="button"
          className={styles.eyeButton}
          onClick={handleTogglePasswordVisibility}
        >
          <div className={styles.eyeIcon}>
            {isPasswordVisible ? (
              <Image
                src="/img/eye_visible.svg"
                alt="Show password icon"
                width={24}
                height={24}
              />
            ) : (
              <Image
                src="/img/eye_hidden.svg"
                alt="Hide password icon"
                width={24}
                height={24}
              />
            )}
          </div>
        </button>
      )}
    </div>
  )
}

export default SignUpInInput
