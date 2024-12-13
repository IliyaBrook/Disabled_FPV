import type { RootState } from '@/app/store/store'
import type { TDict, TLangOptions } from '@/app/types'
import type { IUserData } from '@/app/types/store/userData'
import { createSelector } from '@reduxjs/toolkit'

interface UserData {
  authUser: IUserData
  lang: TLangOptions
  dict: TDict
}

export const localSelector = (state: RootState): RootState['localization'] =>
  state.localization
export const modalSelector = (state: RootState): RootState['modal'] =>
  state.modal

export const authUserSelector = (state: RootState): IUserData => {
  return state.userState
}

// userDataWithLocalization
export const userDataWithLocalSelector = createSelector(
  [authUserSelector, localSelector],
  (user, local): UserData => ({
    authUser: user,
    ...local,
  })
)

export const coursesSelector = (state: RootState): RootState['coursesState'] =>
  state.coursesState

export const userDataWithCourses = createSelector(
  [authUserSelector, coursesSelector],
  (userData, courses) => ({
    userData,
    courses,
  })
)
