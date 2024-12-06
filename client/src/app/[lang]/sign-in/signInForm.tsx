'use client'
import SignUpInInput from '@/app/components/SignUpInInput/SignUpInInput'
import SubmitButton from '@/app/components/SubmitButton/SubmitButton'
import { useAppDispatch } from '@/app/store/hooks'
import { useSignInMutation } from '@/app/store/thunks'
import type { ILangProps } from '@/app/types'
import type { ISignInForm } from '@/app/types/pages/signIn.types'
import { defaultEmail, defaultPassword } from '@/app/utils/constants'
import {
  getHandleSuccessDispatch,
  getSignUpInFormActions,
  signInDefaultState,
} from '@/app/utils/signUpInForm.utils'
import styles from '@/app/wrappers/signInUpLayout/signInUpLayout.module.scss'
import Form from 'next/form'
import React, { useActionState, useRef } from 'react'

const SignInForm: React.FC<Omit<ILangProps, 'lang'>> = ({ dict }) => {
  const dispatch = useAppDispatch()
  const timerRef = useRef<NodeJS.Timeout | null>(null)
  const [fetchData] = useSignInMutation()

  const handleSuccessDispatch = getHandleSuccessDispatch({
    afterSuccessRedirectTo: '/courses',
    dict,
    dispatch,
    successMessage: dict['Successfully logged in'],
  })

  const formActions = getSignUpInFormActions<ISignInForm>({
    dispatch,
    timerRef,
    dict,
    dataFetchFunc: fetchData,
    pageName: 'signIn',
    successDispatch: handleSuccessDispatch,
  })

  const [formState, formAction] = useActionState<ISignInForm, FormData>(
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
            defaultValue={formState.email || defaultEmail}
          />

          <SignUpInInput
            type="password"
            placeholder={dict['Password']}
            name="password"
            defaultValue={formState.password || defaultPassword}
          />
        </div>
        <div className={styles.submitBtnContainer}>
          <SubmitButton>{dict['Sign In'].toUpperCase()}</SubmitButton>
        </div>
      </Form>
    </div>
  )
}

export default SignInForm
