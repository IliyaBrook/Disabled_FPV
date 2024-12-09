'use server'

import AdminCoursePage from '@/app/[lang]/courses/[courseId]/components/adminCoursePage'
import CourseLayout from '@/app/[lang]/courses/[courseId]/components/courseLayout/courseLayout'
import CourseTitle from '@/app/[lang]/courses/[courseId]/components/courseTitle/courseTitle'
import { Spinner } from '@/app/components/Spinner/Spinner'
import type { TLangOptions } from '@/app/types'
import type { ICourse } from '@/app/types/store/courses'
import { apiUrl } from '@/app/utils/constants'
import React from 'react'

interface UsersCourse {
  courseId: string
  lang: TLangOptions
}

async function getCourseData() {
  const response = await fetch(
    `${apiUrl}/api/courses?populate=true&limit=999`,
    {
      credentials: 'include',
      cache: 'force-cache',
      next: {
        revalidate: 3600,
      },
    }
  )
  return await response.json()
}

export default async function UsersCourse({ courseId, lang }: UsersCourse) {
  const courses: ICourse[] = await getCourseData()

  const course: ICourse | undefined = courses.find(
    (course: ICourse) => course.id === courseId
  )

  if (!course) return <Spinner />
  return (
    <CourseLayout>
      <CourseTitle>{course.name}</CourseTitle>
      <AdminCoursePage
        pages={course.pages}
        isAdmin={false}
        courseId={course.id}
      />
    </CourseLayout>
  )
}
