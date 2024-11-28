'use client'

import React, { useState } from 'react'
import dynamic from 'next/dynamic'
// import 'jodit/es2021/jodit.min.css'

const JoditEditor = dynamic(() => import('jodit-react'), { ssr: false })

interface RichTextEditorProps {
  initialValue?: string
  onChange: (value: string) => void
}

let recognition
if (typeof window !== 'undefined' && 'webkitSpeechRecognition' in window) {
  recognition = new (window as any).webkitSpeechRecognition()
  recognition.continuous = true
  recognition.interimResults = true
  recognition.lang = 'en-US'
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

  return (
    <JoditEditor
      value={value}
      config={{
        readonly: false,
        speechRecognition: {
          enable: true,
          onError: (error) => {
            console.error('Speech recognition error:', error)
          },
        },
      }}
      onBlur={handleBlur}
    />
  )
}

export default RichTextEditor
