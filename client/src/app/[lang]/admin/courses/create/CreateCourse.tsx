'use client'

import type { TLangOptions } from '@/app/types'
import React, { type ReactElement, useState } from 'react'
import RichTextEditor from '../../../../components/RichTextEditor/RichTextEditor'

interface ICreateCourse {
  lang: TLangOptions
}

const CreateCourse = ({ lang }: ICreateCourse): ReactElement => {
  const [content, setContent] = useState('')

  const handleSave = () => {
    console.log('Saving content:', content)
    // Добавьте логику сохранения, например, API-запрос
  }

  return (
    <div style={{ height: '100%' }}>
      <RichTextEditor
        initialValue={content}
        onChange={setContent}
        lang={lang}
      />
      <button onClick={handleSave}>Save</button>
    </div>
  )
}

export default CreateCourse
