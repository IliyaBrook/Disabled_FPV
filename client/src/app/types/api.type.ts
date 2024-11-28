export type IServerErrorRe = {
  status: number
  data: {
    error: string
  }
}

/**
 * Response from the `/public/authUser | login | register`, endpoints.
 */
export interface IAuthResponse {
  id: string
  email: string
  role: string
  first_name: string
  last_name: string
  error?: IServerErrorRe
}

/**
 * Response from the `/public/logout` endpoint.
 */
export interface ILogoutResponse {
  message: string
  error?: string
}
