'use client'
import Input from '@/app/components/Input/Input'
import RichTextEditor from '@/app/components/RichTextEditor/RichTextEditor'
import { useUpdateCoursePageMutation } from '@/app/store/thunks'
import type { ICoursePage } from '@/app/types/pages/course.types'
import React, { useState } from 'react'
import styles from './coursePage.module.scss'

interface CoursePageProps {
  pages: ICoursePage[]
  isAdmin: boolean
  courseId: string
}

const CoursePage: React.FC<CoursePageProps> = ({
  pages,
  isAdmin,
  courseId,
}) => {
  const [currentPage, setCurrentPage] = useState(
    pages.length > 0 ? pages[0] : pages[1]
  )
  const [isEditing, setIsEditing] = useState(false)
  const [content, setContent] = useState<string | undefined>(
    currentPage.content
  )
  const [updatePage] = useUpdateCoursePageMutation()

  const handlePageChange = (pageNumber: number): void => {
    setCurrentPage((prev) => ({ ...prev, page_number: pageNumber }))
    const page = pages.find((page) => page.page_number === pageNumber)
    setContent(page?.content)
    setIsEditing(false)
  }

  const handleSaveContent = async (): Promise<void> => {
    if (!currentPage) return
    await updatePage({
      course_id: courseId,
      content,
      page_number: currentPage.page_number,
    })
    setIsEditing(false)
  }

  const currentPageData = pages.find(
    (page) => page.page_number === currentPage.page_number
  )
  const pageLogic = currentPageData?.logic
  console.log('current page logic:', pageLogic)

  if (!currentPageData) {
    return <div className={styles.error}>Page not found</div>
  }

  return (
    <div className={styles.coursePage}>
      <div className={styles.pageContent}>
        {currentPageData.videos?.length > 0 ? (
          <div className={styles.videoList}>
            {currentPageData.videos.map((video) => (
              <div className={styles.videoItem} key={video.video_id}>
                {isAdmin && isEditing ? (
                  <Input
                    defaultValue={video.title}
                    onChange={(value) => {
                      const videoIndex = currentPageData.videos.findIndex(
                        (v) => v.video_id === video.video_id
                      )
                      if (videoIndex !== -1) {
                        currentPageData.videos[videoIndex].title = value
                      }
                    }}
                  />
                ) : (
                  <h3>{video.title}</h3>
                )}

                {isAdmin && isEditing ? (
                  <RichTextEditor
                    initialValue={video.description}
                    onChange={(value) => {
                      const videoIndex = currentPageData.videos.findIndex(
                        (v) => v.video_id === video.video_id
                      )
                      if (videoIndex !== -1) {
                        currentPageData.videos[videoIndex].description = value
                      }
                    }}
                    lang="en"
                    className={styles.richTextEditor}
                  />
                ) : (
                  <div
                    dangerouslySetInnerHTML={{ __html: video.description }}
                  />
                )}
                <iframe
                  src={`https://www.youtube.com/embed/${video.video_id}`}
                  title={video.title}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className={styles.videoIframe}
                />
              </div>
            ))}
          </div>
        ) : isAdmin && isEditing ? (
          <RichTextEditor
            initialValue={currentPageData.content}
            onChange={setContent}
            lang="en"
            className={styles.richTextEditor}
          />
        ) : (
          <div dangerouslySetInnerHTML={{ __html: currentPageData.content }} />
        )}
      </div>

      <div className={styles.bottomButtons}>
        {isAdmin && (
          <div className={styles.adminControls}>
            {isEditing ? (
              <button className={styles.saveButton} onClick={handleSaveContent}>
                Save Changes
              </button>
            ) : (
              <button
                className={styles.editButton}
                onClick={() => setIsEditing(true)}
              >
                Edit Page
              </button>
            )}
          </div>
        )}

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
      </div>
    </div>
  )
}

export default CoursePage
