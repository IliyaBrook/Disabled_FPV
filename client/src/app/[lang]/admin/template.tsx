import { getUserDataServer } from '@/app/store/serverFunctions/getUserDataServer'
import StoreProviderWrapper from '@/app/wrappers/storeProvider'
import React from 'react'

export default async function Template({
  children,
  ...rest
}: {
  children: React.ReactNode
}) {
  console.log('template rest:', rest)

  const userData = await getUserDataServer()
  console.log('userData: ', userData)

  // if (!userData || 'error' in userData || userData.role !== 'admin') {
  //   return <NotFound />
  // }

  // if (!userData || 'error' in userData || userData.role !== 'admin') {
  //   return <NotFound />
  // }

  return <StoreProviderWrapper>{children}</StoreProviderWrapper>
}
