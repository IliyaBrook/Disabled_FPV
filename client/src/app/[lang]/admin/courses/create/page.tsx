import CreateCourse from '@/app/[lang]/admin/courses/create/CreateCourse'
import type { TLangOptions } from '@/app/types'
import { getDictionary } from '@/app/utils/dictionaries'
import React from 'react'

export default async function CreateCoursePage({
  params,
}: {
  params: Promise<{ lang: TLangOptions }>
}): Promise<React.ReactElement> {
  const p = await params
  const dict = await getDictionary(p.lang)
  return <CreateCourse dict={dict} />
}
