'use client'
import SignUpInInput from '@/app/components/SignUpInInput/SignUpInInput'
import { useAppDispatch, useAppSelector } from '@/app/store/hooks'
import type { RootState } from '@/app/store/store'
import type { ISignUpForm } from '@/app/types/pages/signUp.types'

import type { ILangProps } from '@/app/types/sharable.types'
import { getSignUpInFormActions } from '@/app/utils/signUpInForm.utils'
import Form from 'next/form'
import React, { useActionState, useCallback, useRef } from 'react'
import styles from './signUp.module.scss'

const SignUpForm: React.FC<ILangProps> = ({ dict }) => {
  const dispatch = useAppDispatch()
  const timerRef = useRef<NodeJS.Timeout | null>(null)
  const state = useAppSelector((state: RootState) => state.status)
  const pending = state.pending

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
  const setFormState = (formData: ISignUpForm): ISignUpForm => {
    console.log('formData:', formData)

    return formData
  }

  const [formState, formAction] = useActionState(formActions, {
    first_name: '',
    last_name: '',
    email: '',
    password: '',
    confirm_password: '',
  })

  return (
    <div className={styles.signUp}>
      <pre style={{ color: 'red' }}>{state.statusMessage}</pre>
      <Form className={styles.inputsContainer} action={formAction}>
        <div className={styles.inputGroup}>
          <SignUpInInput
            type="text"
            placeholder="First Name"
            name="first_name"
            defaultValue={formState.first_name}
          />
          <SignUpInInput
            type="text"
            placeholder="Last Name"
            name="last_name"
            defaultValue={formState.last_name}
          />
          <SignUpInInput
            type="email"
            placeholder="Email"
            name="email"
            defaultValue={formState.email}
          />
          <SignUpInInput
            type="password"
            placeholder="Password"
            name="password"
            defaultValue={formState.password}
          />
          <SignUpInInput
            type="password"
            placeholder="Confirm your password"
            name="confirm_password"
            defaultValue={formState.confirm_password}
          />
        </div>
        <div className={styles.submitButton}>
          <button
            disabled={pending}
            formAction={formAction}
            className={styles.submitButton}
          >
            {pending ? 'Submitting...' : 'Submit'}
          </button>
        </div>
        {/* {formStatus.statusMessage && ( */}
        {/*   <p className={styles.statusMessage}>{formStatus.statusMessage}</p> */}
        {/* )} */}
      </Form>
    </div>
  )
}

export default SignUpForm
