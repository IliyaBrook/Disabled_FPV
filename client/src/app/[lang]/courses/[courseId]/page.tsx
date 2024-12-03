import CoursePage from '@/app/[lang]/courses/[courseId]/coursePage'
import type { TLangOptions } from '@/app/types'
import React from 'react'

export default async function CoursesPageByUserId({
  params,
}: {
  params: Promise<{ courseId: string; lang: TLangOptions }>
}): Promise<React.ReactElement> {
  const { courseId } = await params
  return <CoursePage courseId={courseId} />
}
