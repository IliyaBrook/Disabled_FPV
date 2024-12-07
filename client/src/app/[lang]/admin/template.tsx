import NotFound from '@/app/[lang]/not-found'
import { fetchServerAuthUser } from '@/app/utils/serverUtils/fetchServerAuthUser'
import React from 'react'

export default async function Template({
  children,
}: {
  children: React.ReactNode
}) {
  const userData = await fetchServerAuthUser()

  if (!userData || 'error' in userData || userData.role !== 'admin') {
    return <NotFound />
  }

  return children
}
