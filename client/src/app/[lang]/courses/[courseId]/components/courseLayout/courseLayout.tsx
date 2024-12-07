import React from 'react'
import styles from './courseLayout.module.scss'

const CourseLayout: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  return <div className={styles.courseLayout}>{children}</div>
}

export default CourseLayout
