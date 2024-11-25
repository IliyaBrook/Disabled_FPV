'use client'
import SignUpInInput from '@/app/components/SignUpInInput/SignUpInInput'
import { useAppDispatch, useAppSelector } from '@/app/store/hooks'
import type { RootState } from '@/app/store/store'

import type { ILangProps } from '@/app/types/sharable.types'
import { getSignUpInFormActions } from '@/app/utils/signUpInForm.utils'
import Form from 'next/form'
import React, { useRef } from 'react'
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
  console.log('pending', pending)

  return (
    <div className={styles.signUp}>
      <Form className={styles.inputsContainer} action={formActions}>
        <div className={styles.inputGroup}>
          <SignUpInInput
            type="text"
            placeholder="First Name"
            name="first_name"
          />
          <SignUpInInput type="text" placeholder="Last Name" name="last_name" />
          <SignUpInInput type="email" placeholder="Email" name="email" />
          <SignUpInInput
            type="password"
            placeholder="Password"
            name="password"
          />
          <SignUpInInput
            type="password"
            placeholder="Confirm your password"
            name="confirm_password"
          />
        </div>
        <div className={styles.submitButton}>
          <button
            type="submit"
            disabled={pending}
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
