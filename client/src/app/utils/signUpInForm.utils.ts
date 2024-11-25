import type { useAppDispatch } from '@/app/store/hooks'
import { resetErrors, setErrors } from '@/app/store/slices'
import type { TDict } from '@/app/types/sharable.types'
import { isEmail } from '@/app/utils/isEmail'
import type React from 'react'

export interface handleSignUpInForm {
  first_name?: string
  last_name?: string
  email: string
  password: string
  confirm_password?: string
  dict: TDict
  pageName: 'signUp' | 'signIn'
}

const handleSignUpInFormErrors = ({
  first_name = '',
  last_name = '',
  email = '',
  password = '',
  confirm_password = '',
  dict,
  pageName,
}: handleSignUpInForm): 'success' | string => {
  const passwordT = password.trim()
  const emailT = email.trim()
  if (!passwordT) return dict['Password is required']
  if (!emailT) return dict['Email is required']
  if (!isEmail(emailT)) return dict['Invalid email address']
  if (pageName === 'signUp') {
    const fistNameT = first_name?.trim()
    const lastNameT = last_name?.trim()
    const confPassT = confirm_password?.trim()
    if (!fistNameT) return dict['First name is required']
    if (!lastNameT) return dict['Last name is required']
    if (passwordT.length < 6)
      return dict['Password must be at least 6 characters']
    if (passwordT !== confPassT) return dict['Passwords do not match']
  }
  return 'success'
}

interface GetSignUpInFormActions {
  dispatch: ReturnType<typeof useAppDispatch>
  timerRef: React.MutableRefObject<NodeJS.Timeout | null>
  dict: TDict
  dataFetchFunc?: () => Promise<any>
  successDispatch?: (fields: Record<string, any>) => void
  pageName: 'signUp' | 'signIn'
}

export const getSignUpInFormActions = ({
  dispatch,
  timerRef,
  dict,
  dataFetchFunc,
  successDispatch,
  pageName,
}: GetSignUpInFormActions): ((formData: FormData) => void) => {
  const resetFormInMs = 5000
  return async (formData: FormData): Promise<void> => {
    try {
      const firstName = formData.get('first_name')
      const lastName = formData.get('last_name')
      const email = formData.get('email')
      const password = formData.get('password')
      const confirmPassword = formData.get('confirm_password')

      const result = handleSignUpInFormErrors({
        first_name: firstName as string,
        last_name: lastName as string,
        email: email as string,
        password: password as string,
        confirm_password: confirmPassword as string,
        dict,
        pageName,
      })
      if (result !== 'success') {
        dispatch(
          setErrors({
            errorMessage: result,
            location: 'signUp',
          })
        )
        return
      } else {
        if (dataFetchFunc) {
          const response = await dataFetchFunc()
          const data: Promise<any> = await response.json()
          if (data && successDispatch) {
            successDispatch(data)
          }
        }
      }
    } catch (error) {
      const errorMessage = (error as Error).message
      dispatch(setErrors({ errorMessage, location: 'signUp' }))
    } finally {
      if (timerRef.current) clearTimeout(timerRef.current)
      timerRef.current = setTimeout(() => {
        dispatch(resetErrors())
      }, resetFormInMs)
    }
  }
}
