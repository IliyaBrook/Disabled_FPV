'use client'
import NotFound from '@/app/[lang]/not-found'
import { useAppSelector } from '@/app/store/hooks'
import { authUserSelector } from '@/app/store/selectors'
import type { TAuthSuccessResponse } from '@/app/types/api.type'
import { usePathname } from 'next/navigation'
import React from 'react'
import styles from './pagesLayout.module.scss'

const PagesLayout: React.FC<{ children: React.ReactNode }> = ({
  children,
}): React.ReactElement => {
  const state: ReturnType<typeof authUserSelector> =
    useAppSelector(authUserSelector)

  const data = state?.data as TAuthSuccessResponse['data']
  const isAdmin = data?.role === 'admin'
  const pathname = usePathname()
  if (data !== undefined) {
    if (!isAdmin && pathname.includes('admin')) {
      return <NotFound />
    }
  }

  return <div className={styles.mainLayout}>{children}</div>
}

export default PagesLayout
