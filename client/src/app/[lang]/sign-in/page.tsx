import SignInUpLayout from '@/app/layouts/signInUpLayout/signInUpLayout'
import type { TDir } from '@/app/types/local.types'
import type { IServerPageParams } from '@/app/types/pages.types'
import { getDictionary } from '@/app/utils/dictionaries'
import React from 'react'

export default async function SignIn({
  params,
}: {
  children: React.ReactNode
  params: IServerPageParams
}): Promise<React.ReactElement> {
  const p = await params
  console.log('SignIn', p)
  const dir: TDir = p.lang === 'he' ? 'rtl' : 'ltr'
  const dict = await getDictionary(p.lang)

  return (
    <SignInUpLayout lang={p.lang} dir={dir} dict={dict} pageName="sign-in">
      <h1></h1>
    </SignInUpLayout>
  )
}
