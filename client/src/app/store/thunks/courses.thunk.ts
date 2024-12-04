import type { ICourse, TCourseForm } from '@/app/types/pages/course.types'
import { apiUrl } from '@/app/utils/constants'
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const coursesThunk = createApi({
  reducerPath: 'courses',
  baseQuery: fetchBaseQuery({
    baseUrl: apiUrl,
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
    },
  }),
  tagTypes: ['Course'],
  endpoints: (builder) => ({
    getCourses: builder.query<
      ICourse[],
      {
        name?: string
        page?: number
        limit?: number
      }
    >({
      query: (data) => ({
        url: `/api/courses?name=${data.name}&page=${data.page}&limit=${data.limit}`,
        method: 'GET',
      }),
      serializeQueryArgs: () => 'courses',
    }),
    getCourseById: builder.query<
      ICourse,
      { course_id: string; page_number?: number }
    >({
      query: (data) => ({
        url: `/api/courses/${data.course_id}?page_number=${data.page_number}`,
        method: 'GET',
      }),
      serializeQueryArgs: () => 'course',
      providesTags: (_result, _error, { course_id }) => [
        {
          type: 'Course',
          id: course_id,
        },
      ],
    }),
    addCourse: builder.mutation<ICourse, TCourseForm>({
      query: (data) => ({
        url: '/admin/createCourse',
        method: 'POST',
        body: data,
      }),
    }),
    updateCourse: builder.mutation<
      ICourse,
      TCourseForm & { course_id: string }
    >({
      query: (data) => {
        const { course_id, ...restData } = data
        return {
          url: `/admin/updateCourse/${course_id}`,
          method: 'PATCH',
          body: restData,
        }
      },
      invalidatesTags: (_result, _error, { course_id }) => [
        { type: 'Course', id: course_id },
      ],
      // invalidatesTags: ['Course'],
    }),
    deleteCourse: builder.mutation<ICourse, { course_id: string }>({
      query: (data) => ({
        url: `/admin/deleteCourse/${data.course_id}`,
        method: 'DELETE',
      }),
    }),
  }),
})
