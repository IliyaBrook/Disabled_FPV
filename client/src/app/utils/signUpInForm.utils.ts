import type { useAppDispatch } from '@/app/store/hooks'
import { closeModal, setModal } from '@/app/store/slices'
import type { ISignInForm } from '@/app/types/pages/signIn.types'
import type { ISignUpForm } from '@/app/types/pages/signUp.types'
import type { TDict } from '@/app/types/shareable.types'
import { isEmail } from '@/app/utils/isEmail'
import type React from 'react'

export type handleSignUpInForm<T> = T & {
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

const handleSignUpInFormErrors = <T extends Record<string, any>>({
  first_name = '',
  last_name = '',
  email = '',
  password = '',
  confirm_password = '',
  dict,
  pageName,
}: handleSignUpInForm<T>): 'success' | string => {
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

export const getSignUpInFormActions = <T extends Record<string, any>>({
  dispatch,
  timerRef,
  dict,
  dataFetchFunc,
  successDispatch,
  pageName,
}: GetSignUpInFormActions): ((
  prevState: T,
  formData: FormData
) => Promise<T>) => {
  const resetFormInMs = 5000
  const modal = (message: string): void => {
    dispatch(
      setModal({
        message,
        type: 'error',
        location: pageName,
      })
    )
  }
  return async (prevState: T, formData: FormData): Promise<T> => {
    const updatedState: T = {
      ...prevState,
      first_name: formData.get('first_name')
        ? String(formData.get('first_name'))
        : '',
      last_name: formData.get('last_name')
        ? String(formData.get('last_name'))
        : '',
      email: formData.get('email') ? String(formData.get('email')) : '',
      password: formData.get('password')
        ? String(formData.get('password'))
        : '',
      confirm_password: formData.get('confirm_password')
        ? String(formData.get('confirm_password'))
        : '',
    }

    try {
      const result = handleSignUpInFormErrors<T>({
        ...updatedState,
        dict,
        pageName,
      })

      if (result !== 'success') {
        modal(result)
        return prevState
      } else {
        if (dataFetchFunc) {
          const response = await dataFetchFunc()
          const data: Promise<any> = await response.json()
          if (data && successDispatch) {
            successDispatch(data)
            if (pageName === 'signUp') {
              prevState = signUpDefaultState as unknown as T
            } else {
              prevState = signInDefaultState as unknown as T
            }
          }
        }
      }
    } catch (error) {
      const modalMessage = (error as Error).message
      modal(modalMessage)
    } finally {
      if (timerRef.current) clearTimeout(timerRef.current)
      timerRef.current = setTimeout(() => {
        dispatch(closeModal())
      }, resetFormInMs)
    }
    return prevState
  }
}
