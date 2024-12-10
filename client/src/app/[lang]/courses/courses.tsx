import type { ICourse } from '@/app/types/store/courses'
import React from 'react'
import styles from './courses.module.scss'

interface CoursesProps {
  courses: ICourse[] | null
}
const Courses: React.FC<CoursesProps> = ({ courses }) => {
  return (
    <div className={styles.courses}>
      <div className={styles.searchInputContainer}></div>
      <div className={styles.coursesCardsContainer}>
        {/* test */}
        <div style={{ backgroundColor: 'red' }}>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Alias
          consequatur dicta distinctio doloribus eveniet ex, fugit ipsum, neque
        </div>
        <div style={{ backgroundColor: 'red' }}>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Alias
          consequatur dicta distinctio doloribus eveniet ex, fugit ipsum, neque
        </div>
        <div style={{ backgroundColor: 'red' }}>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Alias
          consequatur dicta distinctio doloribus eveniet ex, fugit ipsum, neque
        </div>
        <div style={{ backgroundColor: 'red' }}>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Alias
          consequatur dicta distinctio doloribus eveniet ex, fugit ipsum, neque
        </div>
        <div style={{ backgroundColor: 'red' }}>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Alias
          consequatur dicta distinctio doloribus eveniet ex, fugit ipsum, neque
        </div>
        <div style={{ backgroundColor: 'red' }} />
        <div style={{ backgroundColor: 'red' }} />
        <div style={{ backgroundColor: 'red' }} />
        <div style={{ backgroundColor: 'red' }}>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Alias
          consequatur dicta distinctio doloribus eveniet ex, fugit ipsum, neque
        </div>
        <div style={{ backgroundColor: 'red' }}>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Alias
          consequatur dicta distinctio doloribus eveniet ex, fugit ipsum, neque
        </div>
        <div style={{ backgroundColor: 'red' }}>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Alias
          consequatur dicta distinctio doloribus eveniet ex, fugit ipsum, neque
        </div>
        <div style={{ backgroundColor: 'red' }}>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Alias
          consequatur dicta distinctio doloribus eveniet ex, fugit ipsum, neque
        </div>
        <div style={{ backgroundColor: 'red' }}>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Alias
          consequatur dicta distinctio doloribus eveniet ex, fugit ipsum, neque
        </div>
        <div style={{ backgroundColor: 'red' }}>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Alias
          consequatur dicta distinctio doloribus eveniet ex, fugit ipsum, neque
        </div>
        <div style={{ backgroundColor: 'red' }}>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Alias
          consequatur dicta distinctio doloribus eveniet ex, fugit ipsum, neque
        </div>
        <div style={{ backgroundColor: 'red' }}>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Alias
          consequatur dicta distinctio doloribus eveniet ex, fugit ipsum, neque
        </div>
        <div style={{ backgroundColor: 'red' }}>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Alias
          consequatur dicta distinctio doloribus eveniet ex, fugit ipsum, neque
        </div>
        <div style={{ backgroundColor: 'red' }} />
        <div style={{ backgroundColor: 'red' }} />
        <div style={{ backgroundColor: 'red' }} />
        <div style={{ backgroundColor: 'red' }}>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Alias
          consequatur dicta distinctio doloribus eveniet ex, fugit ipsum, neque
        </div>
        <div style={{ backgroundColor: 'red' }}>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Alias
          consequatur dicta distinctio doloribus eveniet ex, fugit ipsum, neque
        </div>
        <div style={{ backgroundColor: 'red' }}>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Alias
          consequatur dicta distinctio doloribus eveniet ex, fugit ipsum, neque
        </div>
        <div style={{ backgroundColor: 'red' }}>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Alias
          consequatur dicta distinctio doloribus eveniet ex, fugit ipsum, neque
        </div>
        <div style={{ backgroundColor: 'red' }}>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Alias
          consequatur dicta distinctio doloribus eveniet ex, fugit ipsum, neque
        </div>
        <div style={{ backgroundColor: 'red' }}>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Alias
          consequatur dicta distinctio doloribus eveniet ex, fugit ipsum, neque
        </div>
        <div style={{ backgroundColor: 'red' }}>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Alias
          consequatur dicta distinctio doloribus eveniet ex, fugit ipsum, neque
        </div>
        <div style={{ backgroundColor: 'red' }}>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Alias
          consequatur dicta distinctio doloribus eveniet ex, fugit ipsum, neque
        </div>
        <div style={{ backgroundColor: 'red' }}>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Alias
          consequatur dicta distinctio doloribus eveniet ex, fugit ipsum, neque
        </div>
        <div style={{ backgroundColor: 'red' }} />
        <div style={{ backgroundColor: 'red' }} />
        <div style={{ backgroundColor: 'red' }} />
        <div style={{ backgroundColor: 'red' }}>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Alias
          consequatur dicta distinctio doloribus eveniet ex, fugit ipsum, neque
        </div>
        <div style={{ backgroundColor: 'red' }}>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Alias
          consequatur dicta distinctio doloribus eveniet ex, fugit ipsum, neque
        </div>
        <div style={{ backgroundColor: 'red' }}>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Alias
          consequatur dicta distinctio doloribus eveniet ex, fugit ipsum, neque
        </div>
        <div style={{ backgroundColor: 'red' }}>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Alias
          consequatur dicta distinctio doloribus eveniet ex, fugit ipsum, neque
        </div>
        {/* test */}
      </div>
    </div>
  )
}

export default Courses
