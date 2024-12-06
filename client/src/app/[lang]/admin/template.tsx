import NotFound from '@/app/[lang]/not-found'
import type { TLangOptions } from '@/app/types'
import { fetchServerAuthUser } from '@/app/utils/serverUtils/fetchServerAuthUser'
import getCurrentPathServer from '@/app/utils/serverUtils/getPathServer'
import React from 'react'

export default async function Template({
  children,
}: {
  children: React.ReactNode
}) {
  const path = await getCurrentPathServer()
  const lang = path.split('/')[3] as TLangOptions

  const userData = await fetchServerAuthUser()
  if (!userData || 'error' in userData || userData.role !== 'admin') {
    return <NotFound lang={lang} />
  }

  return <div>{children}</div>
}
