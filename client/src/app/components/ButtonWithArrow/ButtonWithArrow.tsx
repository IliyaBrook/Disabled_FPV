'use client'

import useGetDir from '@/app/hooks/useGetDir'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import React, { type CSSProperties } from 'react'
import styles from './ButtonWithArrow.module.scss'

interface IButtonProps {
  destination?: string
  title?: string
  className?: string
  logic?: 'link' | 'onClick'
  backgroundColor?: CSSProperties['backgroundColor']
  backgroundHoverColor?: CSSProperties['backgroundColor']
  style?: CSSProperties
  onClick?: (props: React.MouseEvent<HTMLButtonElement>) => void
}

const ButtonWithArrow = ({
  destination = '',
  title,
  className,
  logic = 'link',
  onClick,
  backgroundColor,
  backgroundHoverColor,
  style = {},
}: IButtonProps): React.ReactElement => {
  const dir = useGetDir()
  const router = useRouter()
  return (
    <button
      onClick={(props) =>
        logic === 'link'
          ? router.push(destination)
          : onClick
            ? onClick(props)
            : null
      }
      style={
        {
          ...style,
          '--background-color': backgroundColor,
          '--background-hover-color': backgroundHoverColor,
        } as React.CSSProperties
      }
      className={`${styles?.buttonWithArrow || ''}
      ${className || ''} ${dir === 'rtl' ? styles.rtlStyle : ''}`}
    >
      <span className={styles.title}>{title}</span>
      <span className={styles.arrowWrapper}>
        <Image
          src="/img/arrow_right.svg"
          alt="Disabled FPV Logo"
          width={20}
          height={20}
        />
      </span>
    </button>
  )
}

export default ButtonWithArrow
