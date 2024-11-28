import type { RootState } from '@/app/store/store'
import type { ILangProps } from '@/app/types'
import type { modalState } from '@/app/types/store/modal.types'
import { createSelector } from '@reduxjs/toolkit'

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
export const userDataWithLocalizationSelector = createSelector(
  [authUserSelector, localSelector],
  (user, local) => {
    if (!user) {
      return {
        authUser: null,
        ...local,
      }
    }

    const { data, ...rest } = user

    return {
      authUser: data ?? null,
      status: rest?.status || 'pending',
      ...local,
    }
  }
)
