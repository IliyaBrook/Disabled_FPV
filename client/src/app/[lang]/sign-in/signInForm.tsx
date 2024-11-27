'use client'
import SignUpInInput from '@/app/components/SignUpInInput/SignUpInInput'
import SubmitButton from '@/app/components/SubmitButton/SubmitButton'
import { useAppDispatch } from '@/app/store/hooks'
import { setModal } from '@/app/store/slices'
import type { ISignInForm } from '@/app/types/pages/signIn.types'
import { useRouter } from 'next/navigation'
import type { IAuthServerRe, ILangProps } from '@/app/types'
import { apiUrl } from '@/app/utils/constants'
import {
  getSignUpInFormActions,
  signInDefaultState,
} from '@/app/utils/signUpInForm.utils'
import styles from '@/app/wrappers/signInUpLayout/signInUpLayout.module.scss'
import Form from 'next/form'
import React, { useActionState, useRef } from 'react'

const SignInForm: React.FC<Omit<ILangProps, 'lang'>> = ({ dict, dir }) => {
  const dispatch = useAppDispatch()
  const timerRef = useRef<NodeJS.Timeout | null>(null)
  const router = useRouter()
  const fetchData = (state: ISignInForm): Promise<Response> => {
    return fetch(`${apiUrl}/public/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      body: JSON.stringify({
        email: state.email,
        password: state.password,
      }),
    })
  }
  const handleSuccessDispatch = (serverResponse: IAuthServerRe): void => {
    if ('error' in serverResponse) {
      dispatch(
        setModal({
          isOpen: true,
          message: serverResponse.error,
          type: 'error',
        })
      )
    } else {
      dispatch(
        setModal({
          isOpen: true,
          message: dict['Successfully logged in'],
          type: 'success',
        })
      )
      setTimeout(() => {
        router.push(`/courses`)
      }, 3000)
    }
  }
  const formActions = getSignUpInFormActions<ISignInForm>({
    dispatch,
    timerRef,
    dict,
    dataFetchFunc: fetchData,
    pageName: 'signIn',
    successDispatch: handleSuccessDispatch,
  })

  const [formState, formAction] = useActionState(
    formActions,
    signInDefaultState
  )
  return (
    <div className={styles.formWrapper}>
      <Form className={styles.inputsContainer} action={formAction}>
        <div className={styles.inputGroup}>
          <SignUpInInput
            type="email"
            placeholder={dict['Email']}
            name="email"
            defaultValue={formState.email || 'brook@gmail.com'}
            dir={dir}
          />
          <SignUpInInput
            type="password"
            placeholder={dict['Password']}
            name="password"
            defaultValue={formState.password || '12345678'}
            dir={dir}
          />
        </div>
        <div className={styles.submitBtnContainer}>
          <SubmitButton dir={dir}>{dict['Sign In'].toUpperCase()}</SubmitButton>
        </div>
      </Form>
    </div>
  )
}

export default SignInForm
