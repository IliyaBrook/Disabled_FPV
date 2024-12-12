import { authUser } from '@/app/store/thunks'
import type { TAuthResponse, TAuthSuccessResponse } from '@/app/types/api.type'
import type { IUserData, TRole } from '@/app/types/store/userData'
import { createSlice } from '@reduxjs/toolkit'
import type { WritableDraft } from 'immer'

const userDataInitState: IUserData = {
  id: '',
  role: 'user',
  first_name: '',
  last_name: '',
  email: '',
}

const updateUserData = (
  state: WritableDraft<IUserData>,
  data: TAuthSuccessResponse['data']
) => {
  state.id = data.id
  state.email = data.email
  state.first_name = data.first_name
  state.last_name = data.last_name
  state.role = data.role as TRole
}

export const userDataSlice = createSlice({
  name: 'userData',
  initialState: userDataInitState,
  reducers: {},
  extraReducers: (builder) => {
    const mustUpdateEndpoints = [
      authUser.endpoints.authUser.matchFulfilled,
      authUser.endpoints.signIn.matchFulfilled,
      authUser.endpoints.signUp.matchFulfilled,
    ]
    mustUpdateEndpoints.forEach((endpoint) => {
      builder.addMatcher(
        endpoint,
        (
          state: WritableDraft<IUserData>,
          { payload }: { payload: TAuthResponse }
        ) => {
          const payloadData = payload as unknown as IUserData
          updateUserData(state, payloadData)
        }
      )
    })
    builder.addMatcher(
      authUser.endpoints.logOut.matchFulfilled,
      (state: WritableDraft<IUserData>) => {
        state.id = ''
        state.email = ''
        state.first_name = ''
        state.last_name = ''
        state.role = 'user'
      }
    )
  },
})
