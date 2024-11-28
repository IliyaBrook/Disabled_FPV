import SignInForm from '@/app/[lang]/sign-in/signInForm'

import type { TDir, TLangOptions } from '@/app/types'
import { getDictionary } from '@/app/utils/dictionaries'
import SignInUpLayout from '@/app/wrappers/signInUpLayout'
import React from 'react'

export default async function SignIn({
  params,
}: {
  params: Promise<{ lang: TLangOptions }>
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
