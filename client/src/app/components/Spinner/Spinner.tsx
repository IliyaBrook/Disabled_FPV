import React from 'react'
import styles from './Spinner.module.scss'

interface SpinnerProps {
  spinnerStyle?: React.CSSProperties
  wrapperStyle?: React.CSSProperties
  spinnerClassName?: string
  wrapperClassName?: string
}

export const Spinner: React.FC<SpinnerProps> = ({
  spinnerStyle,
  wrapperStyle = { height: '80vh' },
  spinnerClassName,
  wrapperClassName,
}) => {
  return (
    <div
      className={`${styles.root} ${wrapperClassName || ''}`}
      style={wrapperStyle}
    >
      <div
        className={`${styles.spinner} ${spinnerClassName || ''}`}
        style={spinnerStyle}
      ></div>
    </div>
  )
}
