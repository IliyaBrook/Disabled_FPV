import type { IAuthResponse, ILogoutResponse } from '@/app/types/api.type'
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
    authUser: builder.query<IAuthResponse, void>({
      query: () => `/public/authUser`,
    }),
    signIn: builder.mutation<IAuthResponse, ISignInForm>({
      query: (data) => ({
        url: `/public/login`,
        body: data,
      }),
    }),
    signUp: builder.mutation<IAuthResponse, ISignInForm>({
      query: (data) => ({
        url: `/public/register`,
        body: data,
      }),
    }),
    logOut: builder.mutation<ILogoutResponse, void>({
      query: () => `/public/logout`,
    }),
  }),
})
