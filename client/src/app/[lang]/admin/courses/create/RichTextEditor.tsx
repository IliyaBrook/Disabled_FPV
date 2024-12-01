'use client'

import React, { useState } from 'react'
import dynamic from 'next/dynamic'
// import 'jodit/es2021/jodit.min.css'

const JoditEditor = dynamic(() => import('jodit-react'), { ssr: false })

interface RichTextEditorProps {
  initialValue?: string
  onChange: (value: string) => void
}

const RichTextEditor: React.FC<RichTextEditorProps> = ({
  initialValue = '',
  onChange,
}) => {
  const [value, setValue] = useState(initialValue)

  const handleBlur = (newValue: string) => {
    setValue(newValue)
    onChange(newValue)
  }

  const lang = 'en'

  return (
    <JoditEditor
      value={value}
      config={{
        zIndex: 0,
        language: lang,
        readonly: false,
        //removeButtons: ['speech-recognize'],
        disablePlugins: ['speech-recognize'],
        events: {},
        textIcons: false,
      }}
      onBlur={handleBlur}
    />
  )
}

export default RichTextEditor
