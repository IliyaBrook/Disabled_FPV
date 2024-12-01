import CreateCourse from '@/app/[lang]/admin/courses/create/CreateCourse'
import type { TLangOptions } from '@/app/types'
import React from 'react'

export default async function CreateCoursePage({
  params,
}: {
  params: Promise<{ lang: TLangOptions }>
}): Promise<React.ReactElement> {
  const p = await params

  return (
    <div>
      <CreateCourse />
    </div>
  )
}
