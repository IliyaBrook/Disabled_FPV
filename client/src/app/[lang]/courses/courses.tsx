'use client'
import CourseCard from '@/app/[lang]/courses/components/courseCard/courseCard'
import SearchField from '@/app/components/SearchField/SearchField'
import { useGetCoursesQuery } from '@/app/store/thunks'
import type { ICourse } from '@/app/types/store/courses'
import React from 'react'
import styles from './courses.module.scss'

interface CoursesProps {
  courses: ICourse[] | null
}
const Courses: React.FC<CoursesProps> = ({ courses }) => {
  const { data, error, isLoading } = useGetCoursesQuery({
    limit: 999,
    populate: 'true',
  })
  console.log('data ****************:', data)

  const debouncedOnSearch = (value: string) => {
    console.log('debouncedOnSearch value:', value)
  }
  return (
    <div className={styles.courses}>
      <div className={styles.searchInputContainer}>
        <SearchField
          onDebouncedChange={debouncedOnSearch}
          width="70%"
          fontSize="1.2rem"
        />
      </div>
      <div className={styles.coursesCardsContainer}>
        {courses &&
          courses.map((course) => (
            <CourseCard key={course.id} course={course} />
          ))}
      </div>
    </div>
  )
}

export default Courses
