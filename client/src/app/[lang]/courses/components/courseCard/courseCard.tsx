import type { ICourse } from '@/app/types/store/courses'
import React from 'react'

interface courseCardProps {
  courses: ICourse[] | null
}
const CourseCard: React.FC<courseCardProps> = ({ courses }) => {
  return <div></div>
}

export default CourseCard
