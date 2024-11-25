import type { errorsState } from '@/app/types/store/errors.types'
import { createSlice, type PayloadAction } from '@reduxjs/toolkit'
import type { WritableDraft } from 'immer'

export const errorsInitState: errorsState = {
  errorMessage: '',
  location: '',
  pending: false,
}

export const errorsSlice = createSlice({
  name: 'errors',
  initialState: errorsInitState,
  reducers: {
    setErrors(
      state: WritableDraft<errorsState>,
      action: PayloadAction<errorsState>
    ) {
      const payload = action.payload
      state.pending = payload.pending
      state.errorMessage = payload.errorMessage
      state.location = payload.location
    },
    resetErrors(state: WritableDraft<errorsState>) {
      state.errorMessage = ''
      state.location = ''
      state.pending = false
    },
  },
})
