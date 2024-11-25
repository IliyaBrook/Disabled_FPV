import type { RootState } from '@/app/store/store'
import type { ILangProps } from '@/app/types/sharable.types'
import type { statusState } from '@/app/types/store/status.types'
import { createSelector } from '@reduxjs/toolkit'

const localSelector = (state: RootState): ILangProps => state.localization
const statusSelector = (state: RootState): statusState => state.status

export const signUpInFormSelector = createSelector(
  [localSelector, statusSelector],
  (local, errors) => {
    return { ...local, ...errors }
  }
)
