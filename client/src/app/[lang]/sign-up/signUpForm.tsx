'use client'
import SignUpInInput from '@/app/components/SignUpInInput/SignUpInInput'
import SubmitButton from '@/app/components/SubmitButton/SubmitButton'
import { useAppDispatch } from '@/app/store/hooks'

import type { ILangProps } from '@/app/types/sharable.types'
import {
  getSignUpInFormActions,
  signUpDefaultState,
} from '@/app/utils/signUpInForm.utils'
import styles from '@/app/wrappers/signInUpLayout/signInUpLayout.module.scss'
import Form from 'next/form'
import React, { useActionState, useRef } from 'react'

const SignUpForm: React.FC<ILangProps> = ({ dict, dir }) => {
  const dispatch = useAppDispatch()
  const timerRef = useRef<NodeJS.Timeout | null>(null)

  const fetchData = (): Promise<Response> => {
    return Promise.resolve({
      ok: true,
      status: 200,
      json: () => {
        return new Promise((resolve) => {
          setTimeout(() => {
            resolve({ firstName: 'John', lastName: 'Doe' })
          }, 2000)
        })
      },
    } as Response)
  }
  const handleSuccessDispatch = (serverResponse: any): void => {
    console.log('data:', serverResponse)
  }
  const formActions = getSignUpInFormActions({
    dispatch,
    timerRef,
    dict,
    dataFetchFunc: fetchData,
    pageName: 'signUp',
    successDispatch: handleSuccessDispatch,
  })

  const [formState, formAction] = useActionState(
    formActions,
    signUpDefaultState
  )

  return (
    <div className={styles.formWrapper}>
      <Form className={styles.inputsContainer} action={formAction}>
        <div className={styles.inputGroup}>
          <SignUpInInput
            type="text"
            placeholder={dict['First name']}
            name="first_name"
            defaultValue={formState.first_name}
            dir={dir}
          />
          <SignUpInInput
            type="text"
            placeholder={dict['Last name']}
            name="last_name"
            defaultValue={formState.last_name}
            dir={dir}
          />
          <SignUpInInput
            type="email"
            placeholder="Email"
            name="email"
            defaultValue={dict['Email']}
            dir={dir}
          />
          <SignUpInInput
            type="password"
            placeholder={dict['Password']}
            name="password"
            defaultValue={formState.password}
            dir={dir}
          />
          <SignUpInInput
            type="password"
            placeholder={dict['Confirm password']}
            name="confirm_password"
            defaultValue={formState.confirm_password}
            dir={dir}
          />
        </div>
        <div className={styles.submitBtnContainer}>
          <SubmitButton dir={dir}>{dict['Sign Up'].toUpperCase()}</SubmitButton>
        </div>
      </Form>
    </div>
  )
}

export default SignUpForm
