import type { useAppDispatch } from '@/app/store/hooks'
import { closeModal, setModal } from '@/app/store/slices'
import type { TDict } from '@/app/types'
import type { IAuthResponse, IServerErrorRe } from '@/app/types/api.type'
import type { ISignInForm } from '@/app/types/pages/signIn.types'
import type { ISignUpForm } from '@/app/types/pages/signUp.types'
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

interface GetSignUpInFormActions<T> {
  dispatch: ReturnType<typeof useAppDispatch>
  timerRef: React.MutableRefObject<NodeJS.Timeout | null>
  dict: TDict
  dataFetchFunc?: (updatedState: T) => Promise<any>
  successDispatch?: (response: IAuthResponse) => void
  pageName: 'signUp' | 'signIn'
}

export const getSignUpInFormActions = <T extends Record<string, any>>({
  dispatch,
  timerRef,
  dict,
  dataFetchFunc,
  successDispatch,
  pageName,
}: GetSignUpInFormActions<T>): ((
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
        isOpen: true,
        position: 'bottom',
      })
    )
  }
  return async (prevState: T, formData: FormData): Promise<T> => {
    let updatedState: T = {
      ...prevState,
      email: formData.get('email') ? String(formData.get('email')) : '',
      password: formData.get('password')
        ? String(formData.get('password'))
        : '',
    }
    if (pageName == 'signUp') {
      ;(updatedState as unknown as ISignUpForm).first_name = formData.get(
        'first_name'
      )
        ? String(formData.get('first_name'))
        : ''
      ;(updatedState as unknown as ISignUpForm).last_name = formData.get(
        'last_name'
      )
        ? String(formData.get('last_name'))
        : ''
      ;(updatedState as unknown as ISignUpForm).email = formData.get('email')
        ? String(formData.get('email'))
        : ''
      ;(updatedState as unknown as ISignUpForm).confirm_password = formData.get(
        'confirm_password'
      )
        ? String(formData.get('confirm_password'))
        : ''
    }

    try {
      const result = handleSignUpInFormErrors<T>({
        ...updatedState,
        dict,
        pageName,
      })

      if (result !== 'success') {
        modal(result)
        return updatedState
      } else {
        if (dataFetchFunc && successDispatch) {
          const response: Response = await dataFetchFunc(updatedState)
          if (response.ok && response.status === 200) {
            const data: IAuthResponse = await response.json()
            if (data) {
              successDispatch(data)
              if (pageName === 'signUp') {
                updatedState = signUpDefaultState as unknown as T
              } else {
                updatedState = signInDefaultState as unknown as T
              }
            }
          } else {
            if ('error' in response) {
              const errorResponse = response as unknown as {
                error: IServerErrorRe
              }
              successDispatch(errorResponse)
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
    return updatedState
  }
}
