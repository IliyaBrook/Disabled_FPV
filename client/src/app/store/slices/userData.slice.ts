import { authUser } from '@/app/store/thunks'
import type { TAuthResponse, TAuthSuccessResponse } from '@/app/types/api.type'
import type { IUserData, TRole } from '@/app/types/store/userData'
import { createSlice } from '@reduxjs/toolkit'
import type { WritableDraft } from 'immer'

const userDataInitState: IUserData = {
  id: '',
  role: '',
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
  return state
}

export const userDataSlice = createSlice({
  name: 'userState',
  initialState: userDataInitState,
  reducers: {},
  extraReducers: (builder) => {
    const mustUpdateEndpoints = [
      authUser.endpoints.signIn.matchFulfilled,
      authUser.endpoints.signUp.matchFulfilled,
      authUser.endpoints.authUser.matchFulfilled,
    ]
    mustUpdateEndpoints.forEach((endpoint) => {
      builder.addMatcher(
        endpoint,
        (
          state: WritableDraft<IUserData>,
          { payload }: { payload: TAuthResponse }
        ) => {
          const payloadData = payload as unknown as IUserData
          state = updateUserData(state, payloadData)
          return state
        }
      )
    })

    // builder.addMatcher(
    //   authUser.endpoints.authUser.matchFulfilled,
    //   (
    //     // state: WritableDraft<IUserData>,
    //     // { payload }: { payload: TAuthResponse }
    //     state: WritableDraft<IUserData>,
    //     actions
    //   ) => {
    //     console.log('authUser state:', state)
    //     console.log('authUser actions:', actions)
    //   }
    // )
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
