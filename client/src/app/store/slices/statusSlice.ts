import type { statusState } from '@/app/types/store/status.types'
import { createSlice, type PayloadAction } from '@reduxjs/toolkit'
import type { WritableDraft } from 'immer'

export const statusInitState: statusState = {
  statusMessage: '',
  location: '',
  pending: false,
}

export const statusSlice = createSlice({
  name: 'status',
  initialState: statusInitState,
  reducers: {
    setStatus(
      state: WritableDraft<statusState>,
      action: PayloadAction<statusState>
    ) {
      const payload = action.payload
      state.pending = payload.pending
      state.statusMessage = payload.statusMessage
      state.location = payload.location
    },
    resetStatus(state: WritableDraft<statusState>) {
      state.statusMessage = ''
      state.location = ''
      state.pending = false
    },
  },
})
