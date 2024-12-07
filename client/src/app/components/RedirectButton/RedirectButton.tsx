'use client'
import styles from '@/app/components/NotFound/notFound.module.scss'
import { useRouter } from 'next/navigation'
import React from 'react'

interface IRedirectButton
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  redirectTo: string
  text: string
}

const RedirectButton = ({
  redirectTo,
  text,
  ...restProps
}: IRedirectButton) => {
  const router = useRouter()
  return (
    <button
      className={styles.button}
      onClick={() => router.push(redirectTo)}
      {...restProps}
    >
      {text}
    </button>
  )
}

export default RedirectButton
