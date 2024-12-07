'use client'
import AdminCoursePage from '@/app/[lang]/courses/[courseId]/components/adminCoursePage'
import CourseLayout from '@/app/[lang]/courses/[courseId]/components/courseLayout/courseLayout'
import CourseTitle from '@/app/[lang]/courses/[courseId]/components/courseTitle/courseTitle'
import Input from '@/app/components/Input/Input'
import { Spinner } from '@/app/components/Spinner/Spinner'
import { useAppSelector } from '@/app/store/hooks'
import { authUserSelector } from '@/app/store/selectors'
import {
  useGetCourseByIdQuery,
  useUpdateCourseMutation,
} from '@/app/store/thunks'
import type { TLangOptions } from '@/app/types'
import React, { useState } from 'react'
import styles from '../components/courseLayout/courseLayout.module.scss'

interface CoursePageProps {
  courseId: string
  lang: TLangOptions
}

const AdminCourse: React.FC<CoursePageProps> = ({ courseId }) => {
  const { data: courseData } = useGetCourseByIdQuery({
    course_id: courseId,
  })

  const userData = useAppSelector(authUserSelector)
  const [updateCourse] = useUpdateCourseMutation()
  const isAdmin = (userData?.data as any)?.role === 'admin'
  const [isEditing, setIsEditing] = useState(false)
  const [name, setName] = useState(courseData?.name || '')

  const handleSaveCourseDetails = async (): Promise<void> => {
    await updateCourse({
      course_id: courseId,
      name,
      description: courseData?.description || '',
      image: courseData?.image || '',
    })
    setIsEditing(false)
  }

  const handleAddPage = (): void => {
    console.log('Add page for course:', courseId)
  }

  if (!courseData) return <Spinner />
  return (
    <CourseLayout>
      {isAdmin && isEditing ? (
        <Input
          type="text"
          defaultValue={courseData?.name}
          onChange={(e) => setName(e.target.value)}
          className={styles.courseNameInput}
        />
      ) : (
        <CourseTitle>{courseData.name}</CourseTitle>
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
              Edit course
            </button>
          )}
        </div>
      )}

      <AdminCoursePage
        pages={courseData?.pages}
        isAdmin={isAdmin}
        courseId={courseId}
      />
    </CourseLayout>
  )
}

export default AdminCourse
