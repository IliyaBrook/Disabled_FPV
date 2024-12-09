export type TServerErrorRe = {
  error: {
    status: number
    data: {
      error: string
    }
  }
}

export type TAuthSuccessResponse = {
  data: {
    id: string
    email: string
    role: string
    first_name: string
    last_name: string
  }
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
