import type { signUpInFormState } from '@/app/types/store/signUpInForm.types'
import { isEmail } from '@/app/utils/isEmail'
import { createSlice, type PayloadAction } from '@reduxjs/toolkit'
import type { WritableDraft } from 'immer'

const signUpInFormInitialState = {
  first_name: '',
  last_name: '',
  email: '',
  password: '',
  confirm_password: '',
  success: false,
  errorMessage: '',
  pending: false,
}

export const signUpInFormSlice = createSlice({
  name: 'signUpInForm',
  initialState: signUpInFormInitialState,
  reducers: {
    setSignUpInForm(
      state: WritableDraft<signUpInFormState>,
      action: PayloadAction<Omit<signUpInFormState, 'errorMessage' | 'success'>>
    ) {
      const payload = action.payload
      const passwordPayload = (payload.password as string).trim()
      if (
        'first_name' in payload &&
        'last_name' in payload &&
        'confirm_password' in payload &&
        'password' in payload
      ) {
        const fistNamePayload = (payload.first_name as string).trim()
        const fistLastNamePayload = (payload.last_name as string).trim()
        const confPassPayload = (payload.confirm_password as string).trim()
        if (!fistNamePayload) {
          state.errorMessage = 'First name is required'
          return
        }
        if (!fistLastNamePayload) {
          state.errorMessage = 'Last name is required'
          return
        }
        if (passwordPayload !== confPassPayload) {
          state.errorMessage = 'Passwords do not match'
          return
        }
        state.first_name = fistNamePayload
        state.last_name = fistLastNamePayload
        state.confirm_password = confPassPayload
      }
      if (payload.email) {
        if (isEmail(payload.email)) {
          state.email = payload.email
        } else {
          state.errorMessage = 'Invalid email'
          return
        }
      }
      if (!passwordPayload) {
        state.errorMessage = 'Password is required'
        return
      } else if (passwordPayload.length < 8) {
        state.errorMessage = 'Password must be at least 6 characters'
        return
      }
      state.password = passwordPayload
    },
  },
})
