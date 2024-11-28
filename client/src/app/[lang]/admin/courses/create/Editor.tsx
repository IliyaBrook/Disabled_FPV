'use client'

import React, { useRef, useEffect, useState } from 'react'
import dynamic from 'next/dynamic'

// Динамическая загрузка CKEditor

const CKEditor = dynamic(
  () => import('@ckeditor/ckeditor5-react').then((mod) => mod.CKEditor as any),
  { ssr: false }
)

interface EditorProps {
  initialData?: string
  onChange: (data: string) => void
}

const Editor: React.FC<EditorProps> = ({ initialData = '', onChange }) => {
  const [editorLoaded, setEditorLoaded] = useState(false)
  const editorRef = useRef<any>(null)

  useEffect(() => {
    const loadEditor = async (): Promise<void> => {
      const ClassicEditor = await import('@ckeditor/ckeditor5-build-classic')

      editorRef.current = ClassicEditor.default
      setEditorLoaded(true)
    }

    loadEditor()
  }, [])

  return (
    <div>
      {editorLoaded ? (
        <CKEditor
          editor={editorRef.current}
          data={initialData}
          onReady={(editor: any) => {
            console.log('Editor is ready to use!', editor)
          }}
          onChange={(event: any, editor: any) => {
            const data = editor.getData()
            onChange(data)
          }}
          onError={(error: any) => {
            console.error('CKEditor error:', error)
          }}
        />
      ) : (
        <p>Loading editor...</p>
      )}
    </div>
  )
}

export default Editor
