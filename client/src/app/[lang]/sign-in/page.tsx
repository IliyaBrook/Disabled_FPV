import SignInForm from '@/app/[lang]/sign-in/signInForm'

import type { IServerPageParams, TDir } from '@/app/types/shareable.types'
import { getDictionary } from '@/app/utils/dictionaries'
import AlertModal from '../../components/alertModal'
import SignInUpLayout from '@/app/wrappers/signInUpLayout'
import React from 'react'

export default async function SignIn({
  params,
}: {
  params: Omit<IServerPageParams, 'lang'>
}): Promise<React.ReactElement> {
  const p = await params
  const dir: TDir = p.lang === 'he' ? 'rtl' : 'ltr'
  const dict = await getDictionary(p.lang)

  return (
    <>
      <SignInUpLayout lang={p.lang} dir={dir} dict={dict} pageName="sign-in">
        <SignInForm dict={dict} dir={dir} />
      </SignInUpLayout>
      <AlertModal dir={dir} />
    </>
  )
}
