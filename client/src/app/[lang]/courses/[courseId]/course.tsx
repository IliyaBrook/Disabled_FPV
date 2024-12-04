'use client'
import CoursePage from '@/app/[lang]/courses/[courseId]/CoursePage'
import { Spinner } from '@/app/components/Spinner/Spinner'
import { useAppSelector } from '@/app/store/hooks'
import { authUserSelector } from '@/app/store/selectors'
import {
  useGetCourseByIdQuery,
  useUpdateCourseMutation,
} from '@/app/store/thunks'
import React, { useState } from 'react'
import styles from './coursePage.module.scss'

interface CoursePageProps {
  courseId: string
}

const Course: React.FC<CoursePageProps> = ({ courseId }) => {
  const testCourseWithPage = '672d36da84e07afde9b505c3'
  const { data: courseData } = useGetCourseByIdQuery({
    course_id: testCourseWithPage,
  })
  const userData = useAppSelector(authUserSelector)
  const [updateCourse] = useUpdateCourseMutation()
  const isAdmin = (userData?.data as any)?.role === 'admin'
  console.log('course data:', courseData)
  console.log('userData:', userData)
  console.log('isAdmin:', isAdmin)
  const [isEditing, setIsEditing] = useState(false)
  const [name, setName] = useState(courseData?.name || '')
  const [description, setDescription] = useState(courseData?.description || '')

  const handleSaveCourseDetails = async (): Promise<void> => {
    await updateCourse({
      course_id: courseId,
      name,
      description,
      image: courseData?.image || '',
    })
    setIsEditing(false)
  }

  const handleEditCourse = (): void => {
    console.log('Edit course:', courseId)
  }

  const handleAddPage = (): void => {
    console.log('Add page for course:', courseId)
  }

  if (!courseData) return <Spinner />
  return (
    <div className={styles.course}>
      {/* <h1 className={styles.courseTitle}>{courseData.name}</h1> */}
      {isAdmin && isEditing ? (
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className={styles.courseNameInput}
        />
      ) : (
        <h1 className={styles.courseTitle}>{courseData.name}</h1>
      )}
      {isAdmin && (
        <div className={styles.adminControls}>
          <button className={styles.addPageButton} onClick={handleAddPage}>
            Add Page
          </button>
          {isEditing ? (
            <button
              className={styles.saveChangeButton}
              onClick={handleSaveCourseDetails}
            >
              Save Changes
            </button>
          ) : (
            <button
              className={styles.editCourseButton}
              onClick={() => setIsEditing(true)}
            >
              Edit Course
            </button>
          )}
        </div>
      )}

      <CoursePage
        pages={courseData?.pages}
        isAdmin={isAdmin}
        courseId={courseId}
      />
    </div>
  )
}

export default Course
