'use client'
import { useGetCourseByIdQuery } from '@/app/store/thunks'
import React from 'react'

interface CoursePageProps {
  courseId: string
}

const CoursePage: React.FC<CoursePageProps> = ({ courseId }) => {
  const testCourseWithPage = '672d36da84e07afde9b505c3'
  const { data } = useGetCourseByIdQuery({ course_id: testCourseWithPage })
  console.log('course data:', data)

  return <div>Course Page</div>
}

export default CoursePage
