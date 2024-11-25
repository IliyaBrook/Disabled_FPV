import type { RootState } from '@/app/store/store'
import type { ILangProps } from '@/app/types/sharable.types'
import type { errorsState } from '@/app/types/store/errors.types'
import { createSelector } from '@reduxjs/toolkit'

const localSelector = (state: RootState): ILangProps => state.localization
const errorsSelector = (state: RootState): errorsState => state.errors

export const signUpInFormSelector = createSelector(
  [localSelector, errorsSelector],
  (local, errors) => {
    return { ...local, ...errors }
  }
)
