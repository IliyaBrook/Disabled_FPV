import type { useAppDispatch } from '@/app/store/hooks'
import { resetStatus, setStatus } from '@/app/store/slices'
import type { ISignInForm } from '@/app/types/pages/signIn.types'
import type { ISignUpForm } from '@/app/types/pages/signUp.types'
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

export const signUpDefaultState: ISignUpForm = {
  first_name: '',
  last_name: '',
  email: '',
  password: '',
  confirm_password: '',
}

export const signInDefaultState: ISignInForm = {
  email: '',
  password: '',
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
  if (!emailT) return dict['Email is required']
  if (!passwordT) return dict['Password is required']
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
}: GetSignUpInFormActions): ((
  prevState: ISignUpForm,
  formData: FormData
) => Promise<ISignUpForm>) => {
  const resetFormInMs = 5000
  return async (
    prevState: ISignUpForm,
    formData: FormData
  ): Promise<ISignUpForm> => {
    const firstName = formData.get('first_name')
    const lastName = formData.get('last_name')
    const email = formData.get('email')
    const password = formData.get('password')
    const confirmPassword = formData.get('confirm_password')
    prevState = {
      first_name: firstName ? String(firstName) : '',
      last_name: lastName ? String(lastName) : '',
      email: email ? String(email) : '',
      password: password ? String(password) : '',
      confirm_password: confirmPassword ? String(confirmPassword) : '',
    }

    const setPending = (value: boolean): void => {
      dispatch(
        setStatus({
          pending: value,
        })
      )
    }
    try {
      setPending(true)
      const result = handleSignUpInFormErrors({
        ...prevState,
        dict,
        pageName,
      })
      if (result !== 'success') {
        dispatch(
          setStatus({
            statusMessage: result,
            location: 'signUp',
            pending: false,
          })
        )
        return prevState
      } else {
        if (dataFetchFunc) {
          const response = await dataFetchFunc()
          const data: Promise<any> = await response.json()
          if (data && successDispatch) {
            successDispatch(data)
            setPending(false)
            prevState = signUpDefaultState
          }
        }
      }
    } catch (error) {
      const statusMessage = (error as Error).message
      dispatch(
        setStatus({
          statusMessage,
          location: 'signUp',
          pending: false,
        })
      )
    } finally {
      if (timerRef.current) clearTimeout(timerRef.current)
      timerRef.current = setTimeout(() => {
        dispatch(resetStatus())
      }, resetFormInMs)
    }
    return prevState
  }
}
