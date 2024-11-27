import type { RootState } from '@/app/store/store'
import type { ILangProps } from '@/app/types/shareable.types'
import type { modalState } from '@/app/types/store/modal.types'
import { createSelector } from '@reduxjs/toolkit'

export const localSelector = (state: RootState): ILangProps =>
  state.localization
export const modalSelector = (state: RootState): modalState => state.modal

// noinspection JSUnusedGlobalSymbols
export const signUpInFormSelector = createSelector(
  [localSelector, modalSelector],
  (local, errors) => {
    return { ...local, ...errors }
  }
)
