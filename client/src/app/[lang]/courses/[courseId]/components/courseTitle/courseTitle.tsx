import React from 'react'
import styles from './courseTitle.module.scss'

const CourseTitle: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return <h1 className={styles.courseTitle}>{children}</h1>
}

export default CourseTitle
