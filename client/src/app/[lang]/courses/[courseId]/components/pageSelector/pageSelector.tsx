import React from 'react'
import styles from './pageSelector.module.scss'

interface pageSelectorProps {
  currentPage: {
    page_number: number
  }
  pages: {
    page_number: number
  }[]
  handlePageChange: (page: number) => void
  isAdmin?: boolean
}

const PageSelector: React.FC<pageSelectorProps> = ({
  currentPage,
  handlePageChange,
  pages,
  isAdmin = false,
}) => {
  return (
    <div
      className={styles.pageSelector}
      style={{ width: isAdmin ? '80%' : '100%' }}
    >
      {pages.map((page) => (
        <button
          key={page.page_number}
          onClick={() => handlePageChange(page.page_number)}
          className={`${styles.pageButton} ${
            currentPage.page_number === page.page_number
              ? styles.activePage
              : ''
          }`}
        >
          Page {page.page_number}
        </button>
      ))}
    </div>
  )
}
export default PageSelector
