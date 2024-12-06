'use client'
import useWindowSize from '@/app/hooks/useWindowSize'
import type { TDir } from '@/app/types'
import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import styles from './signUpInInput.module.scss'

interface ISignUpInInputProps {
  type: 'email' | 'password' | 'text'
  placeholder: string
  name: string
  defaultValue?: string
  dir?: TDir
}

const SignUpInInput: React.FC<ISignUpInInputProps> = ({
  type,
  placeholder,
  name,
  defaultValue,
  dir,
}) => {
  const isRtl = dir === 'rtl'
  const { screenWidth } = useWindowSize()
  const [isDesktop, setIsDesktop] = useState(false)
  const [isPasswordVisible, setIsPasswordVisible] = useState(false)

  useEffect(() => {
    setIsDesktop(screenWidth > 768)
  }, [screenWidth])

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
          style={{
            left: isRtl ? '10px' : 'unset',
            right: isRtl ? 'unset' : '10px',
          }}
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
