'use client'

import type { TLangOptions } from '@/app/types'
import dynamic from 'next/dynamic'
import React, { useState } from 'react'
import styles from './richTextEditor.module.scss'

const JoditEditor = dynamic(() => import('jodit-react'), { ssr: false })

interface RichTextEditorProps {
  initialValue?: string
  onChange: (value: string) => void
  lang: TLangOptions
  className?: string
}

const RichTextEditor: React.FC<RichTextEditorProps> = ({
  initialValue = '',
  onChange,
  lang,
  className,
}) => {
  const [value, setValue] = useState(initialValue)

  const handleBlur = (newValue: string): void => {
    setValue(newValue)
    onChange(newValue)
  }

  return (
    <JoditEditor
      className={`${className} ${styles.richTextEditor}`}
      value={value}
      config={{
        zIndex: 0,
        language: lang,
        readonly: false,
        disablePlugins: ['speech-recognize'],
        textIcons: false,
      }}
      onBlur={handleBlur}
    />
  )
}

export default RichTextEditor
