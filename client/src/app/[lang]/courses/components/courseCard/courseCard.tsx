import EditIcon from '@/app/components/IconsComponents/EditIcon'
import type { ICourse } from '@/app/types/store/courses'
import type { IUserData } from '@/app/types/store/userData'
import Image from 'next/image'
import React, { useState } from 'react'
import styles from './courseCard.module.scss'

interface courseCardProps {
  course: ICourse
  userData: IUserData
}

const CourseCard: React.FC<courseCardProps> = ({ course, userData }) => {
  const [editCourse, setEditCourse] = useState(false)
  const isAuthorized = userData.role !== ''
  const isAdmin = userData.role === 'admin'
  return (
    <div className={styles.courseCard}>
      {isAdmin && (
        <div
          className={`${styles.editButton} ${editCourse ? styles.active : ''} ${
            !isAdmin ? styles.inactive : ''
          }`}
        >
          <EditIcon
            className={`${styles.editIcon} ${editCourse ? styles.editIconEditted : ''}"`}
            onClick={() => setEditCourse(!editCourse)}
          />
        </div>
      )}
      <div className={styles.imageContainer}>
        <Image
          src={course.image}
          alt={course.name}
          fill
          priority
          className={styles.image}
          sizes="(max-width: 768px) 425px, 331px"
        />
      </div>
      <div className={styles.courseDescription}>
        <h3>{course.name}</h3>
        <div dangerouslySetInnerHTML={{ __html: course.description }} />
      </div>
      {isAuthorized && (
        <div className={styles.buttonContainer}>
          <button>SUBSCRIBE</button>
        </div>
      )}
    </div>
  )
}

export default CourseCard
