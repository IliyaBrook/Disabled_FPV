import SignInForm from '@/app/[lang]/sign-in/signInForm'

import type { TLangOptions } from '@/app/types'
import { getDictionary } from '@/app/utils/dictionaries'
import SignInUpLayout from '@/app/wrappers/signInUpLayout'
import React from 'react'

export default async function SignIn({
  params,
}: {
  params: Promise<{ lang: TLangOptions }>
}): Promise<React.ReactElement> {
  const p = await params
  const dict = await getDictionary(p.lang)

  return (
    <SignInUpLayout lang={p.lang} dict={dict} pageName="sign-in">
      <SignInForm dict={dict} />
    </SignInUpLayout>
  )
}
