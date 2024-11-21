'use client'

import { useAppSelector } from '@/app/store/hooks'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import styles from './errorBoundary.module.scss'

interface ErrorBoundaryProps {
  children: React.ReactNode
}

const ErrorBoundary: React.FC<ErrorBoundaryProps> = ({ children }) => {
  const [hasError, setHasError] = useState(false)
  const [errorDetails, setErrorDetails] = useState<Error | null>(null)

  const { lang, dict } = useAppSelector((state) => state.localization)
  const router = useRouter()

  const resetError = (): void => {
    setHasError(false)
    setErrorDetails(null)
  }

  useEffect(() => {
    const handleError = (event: ErrorEvent | PromiseRejectionEvent): void => {
      setHasError(true)

      // Сохраняем информацию об ошибке
      if ('reason' in event) {
        setErrorDetails(event.reason) // Для unhandledrejection
      } else {
        setErrorDetails(event.error) // Для обычных ошибок
      }
    }

    window.addEventListener('error', handleError)
    window.addEventListener('unhandledrejection', handleError)

    return () => {
      window.removeEventListener('error', handleError)
      window.removeEventListener('unhandledrejection', handleError)
    }
  }, [])

  if (hasError) {
    return (
      <div className={styles.errorWrapper}>
        <div className={styles.errorContainer}>
          <h2 className={styles.errorTitle}>{dict['Something went wrong!']}</h2>
          {errorDetails && (
            <div className={styles.errorDetails}>
              <p>
                <strong>{dict['Error']}:</strong> {errorDetails.message}
              </p>
              <pre>{errorDetails.stack}</pre>
            </div>
          )}
          <div className={styles.buttons}>
            <button className={styles.button} onClick={resetError}>
              {dict['Try again']}
            </button>
            <button
              className={styles.button}
              onClick={() => router.push(`/${lang}`)}
            >
              {dict['Go to Home Page']}
            </button>
          </div>
        </div>
      </div>
    )
  }

  return <>{children}</>
}

export default ErrorBoundary
