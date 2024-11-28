'use client'
import SignUpInInput from '@/app/components/SignUpInInput/SignUpInInput'
import SubmitButton from '@/app/components/SubmitButton/SubmitButton'
import { useAppDispatch } from '@/app/store/hooks'
import { setModal } from '@/app/store/slices'
import { useSignInMutation } from '@/app/store/thunks'
import type { ILangProps } from '@/app/types'
import type { TAuthResponse } from '@/app/types/api.type'
import type { ISignInForm } from '@/app/types/pages/signIn.types'
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
  const [fetchData] = useSignInMutation()
  const handleSuccessDispatch = (serverResponse: TAuthResponse): void => {
    if ('error' in serverResponse) {
      dispatch(
        setModal({
          isOpen: true,
          message: serverResponse.error.data.error,
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
        window.location.href = '/courses'
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
