import SignUpForm from '@/app/[lang]/sign-up/signUpForm'
import SignInUpLayout from '@/app/wrappers/signInUpLayout/signInUpLayout'

import type { IServerPageParams, TDir } from '@/app/types/sharable.types'
import { getDictionary } from '@/app/utils/dictionaries'
import React from 'react'

export default async function SignUp({
  params,
}: {
  params: IServerPageParams
}): Promise<React.ReactElement> {
  const p = await params
  const dir: TDir = p.lang === 'he' ? 'rtl' : 'ltr'
  const dict = await getDictionary(p.lang)

  return (
    <SignInUpLayout lang={p.lang} dir={dir} dict={dict} pageName="sign-up">
      <SignUpForm dict={dict} dir={dir} lang={p.lang} />
    </SignInUpLayout>
  )
}
