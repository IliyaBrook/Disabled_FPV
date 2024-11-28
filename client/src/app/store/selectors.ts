import type { RootState } from '@/app/store/store'
import type { ILangProps, TDict, TDir, TLangOptions } from '@/app/types'
import type { modalState } from '@/app/types/store/modal.types'
import { createSelector } from '@reduxjs/toolkit'

type AuthUserState = {
  data: {
    id: string
    email: string
    first_name: string
    last_name: string
    role: string
  } | null
  status: 'uninitialized' | 'rejected' | 'pending' | 'fulfilled'
}

interface UserData {
  authUser: AuthUserState['data']
  status: AuthUserState['status']
  lang: TLangOptions
  dir: TDir
  dict: TDict
}

export const localSelector = (state: RootState): ILangProps =>
  state.localization
export const modalSelector = (state: RootState): modalState => state.modal
export const authUserSelector = (
  state: RootState
): typeof state.authUser.queries.details => state.authUser.queries.details

// noinspection JSUnusedGlobalSymbols
export const signUpInFormSelector = createSelector(
  [localSelector, modalSelector],
  (local, errors) => {
    return { ...local, ...errors }
  }
)

// userDataWithLocalization
export const userDataWithLocalSelector = createSelector(
  [authUserSelector, localSelector],
  (user, local): UserData => ({
    authUser: (user?.data as AuthUserState['data']) ?? null,
    status: user?.status || 'uninitialized',
    ...local,
  })
)
