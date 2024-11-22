import Image from 'next/image'
import React from 'react'

interface ILinkIconProps {
  text?: string
  src: string
  width?: number
  height?: number
  imageClassName?: string
  textClassName?: string
  alt?: string
  className?: string
  href?: string
  priority?: boolean
}
const LinkIcon = ({
  height = 20,
  width = 20,
  priority = true,
  alt = '',
  className,
  href,
  text,
  imageClassName,
  src,
  textClassName,
}: ILinkIconProps): React.ReactElement => {
  return (
    <a href={href} className={className}>
      <Image
        src={src}
        alt={alt}
        width={width}
        height={height}
        className={imageClassName}
        priority={priority}
      />
      {text && <p className={textClassName}>{text}</p>}
    </a>
  )
}

export default LinkIcon
