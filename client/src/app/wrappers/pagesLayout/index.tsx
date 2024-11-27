import React from 'react'
import styles from './pagesLayout.module.scss'

const PagesLayout: React.FC<{ children: React.ReactNode }> = ({
  children,
}): React.ReactElement => {
  return <div className={styles.mainLayout}>{children}</div>
}

export default PagesLayout
