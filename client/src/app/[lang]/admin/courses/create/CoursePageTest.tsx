'use client'

import React, { useState } from 'react'
import RichTextEditor from './RichTextEditor'

const CoursePageTest = () => {
  const [content, setContent] = useState('')

  const handleSave = () => {
    console.log('Saving content:', content)
    // Добавьте логику сохранения, например, API-запрос
  }

  return (
    <div style={{ height: '100%' }}>
      <RichTextEditor initialValue={content} onChange={setContent} />
      <button onClick={handleSave}>Save</button>
    </div>
  )
}

export default CoursePageTest
