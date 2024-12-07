'use server'
import { getCourseByIdServer } from '@/app/store/serverFunctions/getCourseByIdServer'
import type { TLangOptions } from '@/app/types'
import React from 'react'

export default async function CoursesPageByCourseId({
  params,
}: {
  params: Promise<{ courseId: string; lang: TLangOptions }>
}): Promise<React.ReactElement> {
  const { courseId } = await params

  const course = await getCourseByIdServer(courseId)
  console.log('courseId:', course)

  // return <Course courseId={courseId} />
  return (
    <div>
      <h1>test</h1>
    </div>
  )
}
