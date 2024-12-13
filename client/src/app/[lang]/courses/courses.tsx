'use client'
import CourseCard from '@/app/[lang]/courses/components/courseCard/courseCard'
import SearchField from '@/app/components/SearchField/SearchField'
import { useAppSelector } from '@/app/store/hooks'
import { authUserSelector } from '@/app/store/selectors'
import type { ICourse } from '@/app/types/store/courses'
import React, { useState } from 'react'
import styles from './courses.module.scss'

interface CoursesProps {
  courses: ICourse[] | null
}
const Courses: React.FC<CoursesProps> = ({ courses }) => {
  const [coursesData, setCoursesData] = useState<ICourse[] | null>(courses)
  const userData = useAppSelector(authUserSelector)

  const debouncedOnSearch = (value: string) => {
    const searchValue = value.toLowerCase().trim()
    if (searchValue === '') {
      setCoursesData(courses)
    } else {
      setCoursesData(
        (prev) =>
          prev?.filter((course) => {
            const name = course.name.toLowerCase().trim()
            return name.includes(searchValue)
          }) ?? null
      )
    }
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
        {coursesData &&
          coursesData.length > 0 &&
          coursesData.map((course) => (
            <CourseCard key={course.id} course={course} userData={userData} />
          ))}
      </div>
    </div>
  )
}

export default Courses
