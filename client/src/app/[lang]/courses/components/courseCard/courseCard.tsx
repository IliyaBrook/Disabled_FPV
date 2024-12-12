import type { ICourse } from '@/app/types/store/courses'
import Image from 'next/image'
import React from 'react'
import styles from './courseCard.module.scss'

interface courseCardProps {
  course: ICourse
}
const CourseCard: React.FC<courseCardProps> = ({ course }) => {
  return (
    <div className={styles.courseCard}>
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
      <div className={styles.buttonContainer}></div>
    </div>
  )
}

export default CourseCard
