import React from 'react'
import styles from './coursePageLayout.module.scss'

interface coursePageLayoutProps
  extends React.HtmlHTMLAttributes<HTMLDivElement> {
  children: React.ReactNode
}
const CoursePageLayout: React.FC<coursePageLayoutProps> = ({ children }) => {
  return <div className={styles.coursePageLayout}>{children}</div>
}

export default CoursePageLayout
