'use server'
import type { TLangOptions } from '@/app/types'
import type { ICoursePage } from '@/app/types/store/courses'
import { fetchServerAuthUser } from '@/app/utils/serverUtils/fetchServerAuthUser'

interface Params {
  params: Promise<{
    courseId: string
    lang: TLangOptions
    courses: ICoursePage
  }>
}

async function getCourseData() {
  const getCoursesServer = await import('@/app/store/serverApi/courses').then(
    (i) => i.getCoursesServer
  )
  return await getCoursesServer({ populate: 'true', limit: 999 })
}

export async function generateStaticParams() {
  const courses = await getCourseData()
  return courses.map((course) => ({
    params: {
      courseId: course.id,
      lang: 'he',
    },
  }))
}

export default async function CoursePageById({ params }: Params) {
  const userData = await fetchServerAuthUser()
  if (userData) {
  }
  const isAdmin = userData && userData.role === 'admin'
  const p = await params
  const courseId = p.courseId

  // return <UsersCourse courseId={courseId} lang={p.lang} />
  if (isAdmin) {
    const { default: AdminCoursePage } = await import('./pages/adminCourse')
    return <AdminCoursePage courseId={courseId} lang={p.lang} />
  } else {
    const { default: UsersCourse } = await import('./pages/usersCourse')
    return <UsersCourse courseId={courseId} lang={p.lang} />
  }
}
