'use server'

import Courses from '@/app/[lang]/courses/courses'
import React from 'react'

async function getCourseData() {
  const { getCourses } = await import('@/app/utils/fetchData/getCourses')
  return await getCourses({ populate: 'true', limit: 999 })
}

export default async function CoursesPage(): Promise<React.ReactElement> {
  const coursesData = await getCourseData()

  return <Courses courses={coursesData} />
}
