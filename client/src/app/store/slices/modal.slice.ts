import type { modalState } from '@/app/types/store/modal.types'
import { createSlice, type PayloadAction } from '@reduxjs/toolkit'
import type { WritableDraft } from 'immer'

export const modalInitState: modalState = {
  message: '',
  location: '',
  type: 'error',
  isOpen: false,
  position: 'bottom',
}

export const modalSlice = createSlice({
  name: 'modal',
  initialState: modalInitState,
  reducers: {
    setModal(
      state: WritableDraft<modalState>,
      action: PayloadAction<modalState>
    ) {
      const payload = action.payload
      Object.assign(state, payload)
    },
    closeModal(state: WritableDraft<modalState>) {
      Object.assign(state, modalInitState)
    },
  },
})
