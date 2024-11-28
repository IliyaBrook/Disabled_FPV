import CoursePageTest from '@/app/[lang]/admin/courses/create/CoursePageTest'
import { Editor } from '@/app/[lang]/admin/courses/create/Editor'
import type { TLangOptions } from '@/app/types'
import React from 'react'
export default async function CreateCourse({
  params,
}: {
  params: Promise<{ lang: TLangOptions }>
}): Promise<React.ReactElement> {
  const p = await params
  console.log('p', p)

  return (
    <div>
      <h1>Create new Course</h1>
      <CoursePageTest />
    </div>
  )
}
