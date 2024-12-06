import SignUpForm from '@/app/[lang]/sign-up/signUpForm'

import type { TDir, TLangOptions } from '@/app/types'
import { getDictionary } from '@/app/utils/dictionaries'
import SignInUpLayout from '@/app/wrappers/signInUpLayout'
import React from 'react'

export default async function SignUp({
  params,
}: {
  params: Promise<{ lang: TLangOptions }>
}): Promise<React.ReactElement> {
  const p = await params
  const dir: TDir = p.lang === 'he' ? 'rtl' : 'ltr'
  const dict = await getDictionary(p.lang)

  return (
    <SignInUpLayout lang={p.lang} dict={dict} pageName="sign-up">
      <SignUpForm dict={dict} lang={p.lang} />
    </SignInUpLayout>
  )
}
