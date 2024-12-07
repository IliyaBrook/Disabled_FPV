'use server'
import type { TLangOptions } from '@/app/types'
import type { ICoursePage } from '@/app/types/store/courses'
import React from 'react'

interface Params {
  params: Promise<{
    courseId: string
    lang: TLangOptions
    courses: ICoursePage
  }>
}

export async function generateStaticParams({ params }: Params) {
  const p = await params

  const getCoursesServer = await import(
    '@/app/store/serverFunctions/courses'
  ).then((i) => i.getCoursesServer)
  const courses = await getCoursesServer()
  console.log('courses: ', courses)

  return courses.map((course) => ({
    params: {
      course,
      lang: p.lang,
    },
  }))
}

export default async function CoursesPageByCourseId({
  params,
}: Params): Promise<React.ReactElement> {
  const p = await params
  console.log('params:', p)
  // const course = await getCourseByIdServer(courseId)

  // console.log('courses:', courses)

  // return <Course courseId={courseId} />
  return (
    <div>
      <h1>test</h1>
    </div>
  )
}
