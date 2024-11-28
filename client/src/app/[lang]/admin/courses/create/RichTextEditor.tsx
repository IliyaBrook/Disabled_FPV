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
        buttons: [
          'ai-assistant',
          'bold',
          'class-span',
          'enter',
          'file',
          'font',
          'fullsize',
          'hr',
          'image',
          'indent',
          'justify',
          'limit',
          'line-height',
          'link',
          'paste',
          'preview',
          'print',
          'search',
          'source',
          'speech-recognize',
          'spellcheck',
          'symbols',
          'table',
          'video',
          'aiAssistant',
          'classSpan',
          'enter',
          'lineHeight',
          'link',
          'paste',
          'resizeHandler',
          'search',
          'source',
          'spellcheck',
          'stat',
          'source',
          'bold',
          'strikethrough',
          'underline',
          'italic',
          'ul',
          'ol',
          'outdent',
          'indent',
          'font',
          'fontsize',
          'brush',
          'paragraph',
          'image',
          'video',
          'table',
          'link',
          'align',
          'undo',
          'redo',
          'hr',
          'eraser',
          'copyformat',
          'fullsize',
          'about',
        ],
        events: {},
        textIcons: false,
      }}
      onBlur={handleBlur}
    />
  )
}

export default RichTextEditor
