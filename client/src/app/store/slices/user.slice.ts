import { authUser } from '@/app/store/thunks'

import type { IAuthResponse } from '@/app/types/api.type'
import type { modalState } from '@/app/types/store/modal.types'
import { createSlice } from '@reduxjs/toolkit'
import type { WritableDraft } from 'immer'

const userInitialState: IAuthResponse = {
  id: '',
  email: '',
  role: '',
  first_name: '',
  last_name: '',
}
export const userSlice = createSlice({
  name: 'user',
  initialState: userInitialState,
  reducers: {
    resetUser: (state: WritableDraft<IAuthResponse>) => {
      state.id = ''
      state.email = ''
      state.role = ''
      state.first_name = ''
      state.last_name = ''
      state.error = ''
    },
  },
})
