// public routes thunks
import { authUser } from './auth.thunks'
export { authUser } from './auth.thunks'
export const {
  useAuthUserQuery,
  useLogOutMutation,
  useSignInMutation,
  useSignUpMutation,
} = authUser
