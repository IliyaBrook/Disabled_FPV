'use client'
import NotFound from '@/app/[lang]/not-found'
import { useAppSelector } from '@/app/store/hooks'
import { authUserSelector } from '@/app/store/selectors'
import { usePathname } from 'next/navigation'
import React from 'react'
import styles from './pagesLayout.module.scss'

const PagesLayout: React.FC<{ children: React.ReactNode }> = ({
  children,
}): React.ReactElement => {
  const state = useAppSelector(authUserSelector)

  // const isReady = state?.status === 'fulfilled'
  // const isRejected = state?.status === 'rejected'
  // if (isRejected) {
  //   // window.location.href = '/'
  // }
  const pathname = usePathname()
  // if (!isReady) {
  //   return <Spinner />
  // }
  const isAdmin = (state?.data as any)?.role === 'admin'
  if (!isAdmin && pathname.includes('/admin/')) {
    return <NotFound />
  }
  return <div className={styles.mainLayout}>{children}</div>
}

export default PagesLayout
