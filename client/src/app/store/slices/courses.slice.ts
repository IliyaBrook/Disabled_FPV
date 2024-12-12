import { coursesThunk } from '@/app/store/thunks'
import type { ICourse } from '@/app/types/store/courses'
import { createSlice, type PayloadAction } from '@reduxjs/toolkit'
import type { WritableDraft } from 'immer'

const coursesInitState: ICourse[] = []

export const coursesSlice = createSlice({
  name: 'coursesSlice',
  initialState: coursesInitState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addMatcher(
      coursesThunk.endpoints.getCourses.matchFulfilled,
      (
        state: WritableDraft<ICourse[]>,
        { payload }: PayloadAction<ICourse[]>
      ) => {
        state = payload
        return state
      }
    )
    builder.addMatcher(
      coursesThunk.endpoints.addCourse.matchFulfilled,
      (state: WritableDraft<ICourse[]>, { payload }: { payload: ICourse }) => {
        state.push(payload)
      }
    )
    builder.addMatcher(
      coursesThunk.endpoints.updateCourse.matchFulfilled,
      (state: WritableDraft<ICourse[]>, { payload }: { payload: ICourse }) => {
        const index = state.findIndex((course) => course.id === payload.id)
        if (index !== -1) {
          state[index] = payload
        }
      }
    )
    builder.addMatcher(
      coursesThunk.endpoints.deleteCourse.matchFulfilled,
      (
        state: WritableDraft<ICourse[]>,
        action: {
          meta: {
            arg: {
              originalArgs: { course_id: string }
            }
          }
        }
      ) => {
        const courseID = action.meta.arg.originalArgs.course_id
        return state.filter((course) => course.id !== courseID)
      }
    )
  },
})
