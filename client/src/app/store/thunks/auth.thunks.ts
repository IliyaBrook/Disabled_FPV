import { setModal } from '@/app/store/slices'
import type { RootState } from '@/app/store/store'
import type { ILogoutResponse, TAuthResponse } from '@/app/types/api.type'
import type { ISignInForm } from '@/app/types/pages/signIn.types'
import { apiUrl } from '@/app/utils/constants'
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const authUser = createApi({
  reducerPath: 'authUser',
  baseQuery: fetchBaseQuery({
    baseUrl: apiUrl,
    credentials: 'include',
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
  }),
  tagTypes: ['Auth'],
  endpoints: (builder) => ({
    authUser: builder.query<TAuthResponse, void>({
      query: () => ({
        url: `/api/authUser`,
        credentials: 'include',
      }),
      serializeQueryArgs: () => 'details',
    }),
    signIn: builder.mutation<TAuthResponse, ISignInForm>({
      query: (data) => ({
        url: `/api/login`,
        body: data,
      }),
    }),
    signUp: builder.mutation<TAuthResponse, ISignInForm>({
      query: (data) => ({
        url: `/api/register`,
        body: data,
      }),
      invalidatesTags: ['Auth'],
    }),
    logOut: builder.mutation<ILogoutResponse, void>({
      query: () => `/api/logout`,
      async onQueryStarted(_, { dispatch, queryFulfilled, getState }) {
        try {
          await queryFulfilled
          const state = getState() as RootState
          const dict = state.localization.dict
          dispatch(
            setModal({
              isOpen: true,
              message: dict?.['You have been successfully logged out'],
              type: 'success',
            })
          )
          setTimeout(() => {
            window.location.href = '/'
          }, 3000)
        } catch (error) {
          console.error('log out error: ', (error as Error).message)
        }
      },
    }),
  }),
})
