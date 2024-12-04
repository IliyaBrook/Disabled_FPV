import React from 'react'
import styles from './youTubeFrame.module.scss'

interface IYouTubeFrame
  extends Omit<
    React.IframeHTMLAttributes<HTMLIFrameElement>,
    'src' | 'allow' | 'allowFullScreen'
  > {
  videoId: string
}

const YouTubeFrame: React.FC<IYouTubeFrame> = ({
  videoId,
  title,
  className,
  ...restProps
}) => {
  return (
    <iframe
      src={`https://www.youtube.com/embed/${videoId}`}
      title={title}
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      allowFullScreen
      className={`${styles.youTubeFrame} ${className || ''}`}
      {...restProps}
    />
  )
}

export default YouTubeFrame
