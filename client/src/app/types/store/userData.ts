export type TRole = 'admin' | 'user'

export interface IUserData {
  id: string
  email: string
  first_name: string
  last_name: string
  role: TRole
}
