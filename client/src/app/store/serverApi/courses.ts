import { makeStore } from '@/app/store/store'
import { coursesThunk } from '@/app/store/thunks'
import type { getCoursesParams, ICourse } from '@/app/types/store/courses'

export const getCourseByIdServer = async (courseId: string) => {
  const store = makeStore()
  store.dispatch(
    coursesThunk.endpoints.getCourseById.initiate({ course_id: courseId })
  )
  await Promise.all(store.dispatch(coursesThunk.util.getRunningQueriesThunk()))
  const state = store.getState()
  return state.courses?.queries?.course?.data
}

export const getCoursesServer = async (
  params: getCoursesParams
): Promise<ICourse[]> => {
  const store = makeStore()
  store.dispatch(coursesThunk.endpoints.getCourses.initiate(params))
  await Promise.all(store.dispatch(coursesThunk.util.getRunningQueriesThunk()))
  const state = store.getState()
  return (state?.courses?.queries?.courses?.data as ICourse[]) ?? []
}
