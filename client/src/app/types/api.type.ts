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

/**
 * Response from the `/public/logout` endpoint.
 */
export interface ILogoutResponse {
  message: string
  error?: string
}
