import SignInForm from '@/app/[lang]/sign-in/signInForm'

import type { IServerPageParams, TDir } from '@/app/types/sharable.types'
import { getDictionary } from '@/app/utils/dictionaries'
import SignInUpLayout from '@/app/wrappers/signInUpLayout/signInUpLayout'
import React from 'react'

export default async function SignIn({
  params,
}: {
  params: IServerPageParams
}): Promise<React.ReactElement> {
  const p = await params
  const dir: TDir = p.lang === 'he' ? 'rtl' : 'ltr'
  const dict = await getDictionary(p.lang)

  return (
    <SignInUpLayout lang={p.lang} dir={dir} dict={dict} pageName="sign-in">
      <SignInForm dict={dict} dir={dir} />
    </SignInUpLayout>
  )
}
