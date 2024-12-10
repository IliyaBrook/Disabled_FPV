'use client'
import Image from 'next/image'
import React, { useEffect } from 'react'
import styles from './searchField.module.scss'

interface SearchFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
  debounceDelayMs?: number
  onDebouncedChange?: (value: string) => void
  fontSize?: React.CSSProperties['fontSize']
  width?: React.CSSProperties['width']
}
const SearchField: React.FC<SearchFieldProps> = (props: SearchFieldProps) => {
  const [value, setValue] = React.useState('')
  const [debouncedValue, setDebouncedValue] = React.useState('')
  const {
    debounceDelayMs = 500,
    onDebouncedChange,
    fontSize,
    width,
    ...restProps
  } = props
  const onChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value)
  }
  const timerRef = React.useRef<NodeJS.Timeout | null>(null)
  useEffect(() => {
    if (timerRef.current) {
      clearTimeout(timerRef.current)
    }
    timerRef.current = setTimeout(() => {
      setDebouncedValue(value)
    }, debounceDelayMs)
    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current)
      }
    }
  }, [value])

  useEffect(() => {
    if (onDebouncedChange) {
      onDebouncedChange(debouncedValue)
    }
  }, [debouncedValue])

  return (
    <div className={styles.searchField} style={{ width: width ?? '100%' }}>
      <div className={styles.content}>
        <Image
          src="/img/cross_icon.svg"
          alt="Magnifier icon"
          width={18}
          height={18}
        />
        <div className={styles.inputContainer}>
          <input
            {...restProps}
            onChange={onChangeHandler}
            value={restProps.value ?? value}
            style={{
              color: restProps.color ?? '#49454f',
              fontSize: fontSize ?? '100%',
            }}
          />
        </div>
        <Image
          src="/img/magnifier_icon.svg"
          alt="Magnifier icon"
          width={18}
          height={18}
        />
      </div>
    </div>
  )
}

export default SearchField
