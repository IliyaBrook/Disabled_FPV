'use client'

import React, { useState } from 'react'
import Editor from './Editor'

const CoursePageTest = ({ contentFromDb }: { contentFromDb: string }) => {
  const [content, setContent] = useState<string>(contentFromDb)

  const saveContent = async (): Promise<void> => {
    try {
      console.log('content', content)

      // const response = await fetch('/api/save-course', {
      //   method: 'POST',
      //   headers: {
      //     'Content-Type': 'application/json',
      //   },
      //   body: JSON.stringify({ content }),
      // })
      //
      // if (!response.ok) {
      //   throw new Error('Failed to save content')
      // }

      console.log('Content saved successfully')
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <div style={{ position: 'relative' }}>
      <h1>Course Editor</h1>
      <Editor initialData={content} onChange={setContent} />
      <div>
        <h1>Saved Course Content</h1>
        <div dangerouslySetInnerHTML={{ __html: content }} />
      </div>
      <button
        style={{
          position: 'absolute',
          top: '0',
          right: '0',
          width: '300px',
          height: '50px',
        }}
        onClick={saveContent}
      >
        Save Content
      </button>
    </div>
  )
}

export default CoursePageTest
