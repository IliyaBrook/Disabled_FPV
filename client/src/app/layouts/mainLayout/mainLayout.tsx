import React from 'react'
import styles from './mainLayout.module.scss'

const MainLayout: React.FC<{ children: React.ReactNode }> = ({
  children,
}): React.ReactElement => {
  return (
    <div className={styles.mainLayout}>
      <div>{children}</div>
    </div>
  )
}

export default MainLayout
