// auth user thunks
import { authUser } from './auth.thunks'
import { coursePageThunk } from './coursePage.thunk'
import { coursesThunk } from './courses.thunk'

export { authUser } from './auth.thunks'
export const {
  useAuthUserQuery,
  useLogOutMutation,
  useSignInMutation,
  useSignUpMutation,
} = authUser
// courses thunks
export { coursesThunk } from './courses.thunk'
export const {
  useAddCourseMutation,
  useDeleteCourseMutation,
  useGetCourseByIdQuery,
  useGetCoursesQuery,
  useUpdateCourseMutation,
} = coursesThunk
// course pages thunks
export { coursePageThunk } from './coursePage.thunk'
export const {
  useAddCoursePageMutation,
  useDeleteCoursePageMutation,
  useGetCoursePageByIdAndPageNumQuery,
  useUpdateCoursePageMutation,
  useGetCoursePagesQuery,
} = coursePageThunk
