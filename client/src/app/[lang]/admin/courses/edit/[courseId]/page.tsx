import type { TLangOptions } from '@/app/types'
import React from 'react'

export default async function EditCourseById({
  params,
}: {
  params: Promise<{ courseId: string; lang: TLangOptions }>
}): Promise<React.ReactElement> {
  const p = await params
  return (
    <div>
      <h1>Edit course by id</h1>
      <p style={{ color: 'red' }}>User id: {p.courseId}</p>
    </div>
  )
}
