import type { IUserData } from '@/app/types/store/userData'

export type TServerErrorRe = {
  error: {
    status: number
    data: {
      error: string
    }
  }
}

export type TAuthSuccessResponse = {
  data: IUserData
}

export type TAuthResponse = TServerErrorRe | TAuthSuccessResponse

export type TFetchServerAuthUser =
  | TAuthSuccessResponse['data']
  | { error: string }

/**
 * Response from the `/api/logout` endpoint.
 */
export interface ILogoutResponse {
  message: string
  error?: string
}
