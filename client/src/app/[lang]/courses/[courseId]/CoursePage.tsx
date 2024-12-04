'use client'

import Input from '@/app/components/Input/Input'
import RichTextEditor from '@/app/components/RichTextEditor/RichTextEditor'
import YouTubeFrame from '@/app/components/YouTubeFrame/YouTubeFrame'
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
    pages.length > 0 ? pages[0] : null
  )
  const [isEditing, setIsEditing] = useState(false)
  const [updatePage] = useUpdateCoursePageMutation()

  if (!currentPage) {
    return <div className={styles.error}>No pages available</div>
  }

  const handlePageChange = (pageNumber: number): void => {
    const page = pages.find((p) => p.page_number === pageNumber)
    if (page) {
      setCurrentPage(page)
      setIsEditing(false)
    }
  }

  const updateVideoContent = (
    videoId: string,
    field: 'title' | 'description' | 'video_id',
    value: string
  ): void => {
    setCurrentPage((prev) => {
      if (!prev) return prev
      const updatedVideos = prev.videos.map((video) =>
        video.video_id === videoId ? { ...video, [field]: value } : video
      )
      return { ...prev, videos: updatedVideos }
    })
  }

  const handleSaveContent = async (): Promise<void> => {
    if (!currentPage) return
    await updatePage({
      course_id: courseId,
      content: currentPage.content,
      page_number: currentPage.page_number,
      videos: currentPage.videos,
      logic: currentPage.logic,
    })
    setIsEditing(false)
  }

  const renderContent = (): React.ReactElement => {
    if (currentPage.logic === 'rich_text') {
      return isAdmin && isEditing ? (
        <RichTextEditor
          initialValue={currentPage.content}
          onChange={(value) =>
            setCurrentPage((prev) =>
              prev ? { ...prev, content: value } : prev
            )
          }
          lang="en"
          className={styles.richTextEditor}
        />
      ) : (
        <div dangerouslySetInnerHTML={{ __html: currentPage.content }} />
      )
    }

    if (currentPage.logic === 'video_items') {
      return (
        <div className={styles.videoList}>
          {currentPage.videos.map((video) => (
            <div className={styles.videoItem} key={video.video_id}>
              {isAdmin && isEditing ? (
                <>
                  <RichTextEditor
                    initialValue={video.description}
                    onChange={(value) =>
                      updateVideoContent(video.video_id, 'description', value)
                    }
                    lang="en"
                    className={styles.richTextEditor}
                  />
                </>
              ) : (
                <div dangerouslySetInnerHTML={{ __html: video.description }} />
              )}
              {isAdmin && isEditing ? (
                <Input
                  defaultValue={video.video_id}
                  onChange={(e) =>
                    updateVideoContent(
                      video.video_id,
                      'video_id',
                      e.target.value
                    )
                  }
                />
              ) : (
                <YouTubeFrame videoId={video.video_id} />
              )}
            </div>
          ))}
        </div>
      )
    }
    return <div>No valid logic defined</div>
  }
  console.log('currentPage.logic: ', currentPage)

  return (
    <div className={styles.coursePage}>
      {isAdmin && isEditing && (
        <div className={styles.logicSelector}>
          <label>
            <input
              type="radio"
              name="logic"
              value="video_items"
              checked={currentPage.logic === 'video_items'}
              onChange={() =>
                setCurrentPage((prev) =>
                  prev ? { ...prev, logic: 'video_items' } : prev
                )
              }
            />
            Video Items
          </label>
          <label>
            <input
              type="radio"
              name="logic"
              value="rich_text"
              checked={currentPage.logic === 'rich_text'}
              onChange={() =>
                setCurrentPage((prev) =>
                  prev ? { ...prev, logic: 'rich_text' } : prev
                )
              }
            />
            Rich Text
          </label>
        </div>
      )}
      <div className={styles.pageContent}>{renderContent()}</div>

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
