'use client'
import CourseCard from '@/app/[lang]/courses/components/courseCard/courseCard'
import SearchField from '@/app/components/SearchField/SearchField'
import { useAppSelector } from '@/app/store/hooks'
import { useGetCoursesQuery } from '@/app/store/thunks'
import type { ICourse } from '@/app/types/store/courses'
import React, { useState } from 'react'
import styles from './courses.module.scss'

interface CoursesProps {
  courses: ICourse[] | null
}
const Courses: React.FC<CoursesProps> = ({ courses }) => {
  const [searchValue, setSearchValue] = useState('')
  const { data: coursesData } = useGetCoursesQuery({
    limit: 999,
    populate: 'true',
    name: searchValue,
  })
  const userData = useAppSelector((state) => state.authUser)
  // const userData = state?.data

  const debouncedOnSearch = (value: string) => {
    setSearchValue(value)
  }
  console.log('searchValue:', searchValue)
  const data = coursesData && coursesData.length > 0 ? coursesData : courses
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
        {data &&
          data.map((course) => <CourseCard key={course.id} course={course} />)}
      </div>
    </div>
  )
}

export default Courses
