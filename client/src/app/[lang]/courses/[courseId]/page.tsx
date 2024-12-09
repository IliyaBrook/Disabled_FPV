'use server'
import type { TLangOptions } from '@/app/types'
import type { ICoursePage } from '@/app/types/store/courses'
import { fetchServerAuthUser } from '@/app/utils/fetchData/fetchServerAuthUser'

interface Params {
  params: Promise<{
    courseId: string
    lang: TLangOptions
    courses: ICoursePage
  }>
}

async function getCourseData() {
  const { getCourses } = await import('@/app/utils/fetchData/getCourses')
  return await getCourses({ populate: 'true', limit: 999 })
}

export async function generateStaticParams() {
  const courses = await getCourseData()
  if (courses && courses.length > 0) {
    return courses.map((course) => ({
      params: {
        courseId: course.id,
        lang: 'he',
      },
    }))
  }
}

export default async function CoursePageById({ params }: Params) {
  const userData = await fetchServerAuthUser()
  const isAdmin = userData && userData.role === 'admin'
  const p = await params
  const courseId = p.courseId

  if (isAdmin) {
    const { default: AdminCoursePage } = await import('./pages/adminCourse')
    return <AdminCoursePage courseId={courseId} lang={p.lang} />
  } else {
    const { default: UsersCourse } = await import('./pages/usersCourse')
    return <UsersCourse courseId={courseId} lang={p.lang} />
  }
}
