import type { ICoursePage, TCourseForm } from '@/app/types/store/courses'
import { apiUrl } from '@/app/utils/constants'
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const coursePageThunk = createApi({
  reducerPath: 'coursePage',
  baseQuery: fetchBaseQuery({
    baseUrl: apiUrl,
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
    },
  }),
  endpoints: (builder) => ({
    getCoursePageByIdAndPageNum: builder.query<
      ICoursePage,
      { course_id: string; page_number: number }
    >({
      query: (data) => ({
        url: `/api/coursePages/${data.course_id}/${data.page_number}`,
        method: 'GET',
      }),
    }),
    getCoursePages: builder.query<
      ICoursePage[],
      { course_id: string; page_number?: number }
    >({
      query: (data) => ({
        url: `/api/coursePages/?${data.course_id}=id&page_number=${data?.page_number}`,
        method: 'GET',
      }),
    }),
    addCoursePage: builder.mutation<ICoursePage, TCourseForm>({
      query: (data) => ({
        url: '/admin/addCoursePage',
        method: 'POST',
        body: data,
      }),
    }),
    updateCoursePage: builder.mutation<
      ICoursePage,
      Partial<ICoursePage> & { course_id: string; page_number?: number }
    >({
      query: (data) => {
        const { course_id, page_number, ...restData } = data
        return {
          url: `/admin/updateCoursePage/${course_id}/${page_number}`,
          method: 'PATCH',
          body: restData,
        }
      },
    }),
    deleteCoursePage: builder.mutation<
      ICoursePage,
      { course_id: string; page_number: number }
    >({
      query: (data) => ({
        url: `/deleteCoursePage/${data.course_id}/${data.page_number}`,
        method: 'DELETE',
      }),
    }),
  }),
})
