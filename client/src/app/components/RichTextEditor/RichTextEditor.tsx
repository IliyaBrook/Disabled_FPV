'use client'

import type { TLangOptions } from '@/app/types'
import dynamic from 'next/dynamic'
import React, { useState } from 'react'
import './richTextEditor.global.scss'

const JoditEditor = dynamic(() => import('jodit-react'), { ssr: false })

interface RichTextEditorProps {
  initialValue?: string
  onChange: (value: string) => void
  lang: TLangOptions
  className?: string
  readonly?: boolean
}

const RichTextEditor: React.FC<RichTextEditorProps> = ({
  initialValue = '',
  onChange,
  lang,
  className,
  readonly = false,
}) => {
  const [value, setValue] = useState(initialValue)

  const handleBlur = (newValue: string): void => {
    setValue(newValue)
    onChange(newValue)
  }

  return (
    <JoditEditor
      className={className}
      value={value}
      config={{
        language: lang,
        readonly,
        disablePlugins: ['speech-recognize'],
        textIcons: false,
        containerStyle: {},
      }}
      onBlur={handleBlur}
    />
  )
}

export default RichTextEditor
