'use client'
import SignUpInInput from '@/app/components/SignUpInInput/SignUpInInput'
import SubmitButton from '@/app/components/SubmitButton/SubmitButton'
import { useAppDispatch } from '@/app/store/hooks'
import { setModal } from '@/app/store/slices'
import type { ISignInForm } from '@/app/types/pages/signIn.types'

import type { ILangProps } from '@/app/types/shareable.types'
import {
  getSignUpInFormActions,
  signInDefaultState,
} from '@/app/utils/signUpInForm.utils'
import styles from '@/app/wrappers/signInUpLayout/signInUpLayout.module.scss'
import Form from 'next/form'
import React, { useActionState, useEffect, useRef } from 'react'

const SignInForm: React.FC<Omit<ILangProps, 'lang'>> = ({ dict, dir }) => {
  const dispatch = useAppDispatch()
  const timerRef = useRef<NodeJS.Timeout | null>(null)

  // open modal test
  useEffect(() => {
    setTimeout(() => {
      dispatch(
        setModal({
          isOpen: true,
          type: 'error',
          position: 'bottom',
          message: 'password is required',
          location: 'sign-in',
        })
      )
    }, 1)
  }, [])

  const fetchData = (): Promise<Response> => {
    return Promise.resolve({
      ok: true,
      status: 200,
      json: () => {
        return new Promise((resolve) => {
          setTimeout(() => {
            resolve({ firstName: 'John', lastName: 'Phone family n' })
          }, 2000)
        })
      },
    } as Response)
  }
  const handleSuccessDispatch = (serverResponse: any): void => {
    console.log('data:', serverResponse)
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
            defaultValue={formState.email}
            dir={dir}
          />
          <SignUpInInput
            type="password"
            placeholder={dict['Password']}
            name="password"
            defaultValue={formState.password}
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
