import SignInUpLayout from '@/app/layouts/signInUpLayout/signInUpLayout'
import React from 'react'

export default async function SignUp(): Promise<React.ReactElement> {
  return (
    <div>
      <SignInUpLayout>
        <div>Sign up page</div>
      </SignInUpLayout>
    </div>
  )
}
