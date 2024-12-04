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
  endpoints: (builder) => ({
    authUser: builder.query<TAuthResponse, void>({
      query: () => ({
        url: `/api/authUser`,
      }),
      serializeQueryArgs: () => {
        return 'details'
      },
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
    }),
    logOut: builder.mutation<ILogoutResponse, void>({
      query: () => `/api/logout`,
    }),
  }),
})
