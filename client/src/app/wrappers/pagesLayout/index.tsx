// 'use client'
// import NotFound from '@/app/[lang]/not-found'
// import { useAppSelector } from '@/app/store/hooks'
// import { authUserSelector } from '@/app/store/selectors'
// import { usePathname } from 'next/navigation'
// import React from 'react'
// import styles from './pagesLayout.module.scss'

// const PagesLayout: React.FC<{ children: React.ReactNode }> = ({
//   children,
// }): React.ReactElement => {
//   const state = useAppSelector(authUserSelector)
//
//   // const isReady = state?.status === 'fulfilled'
//   // const isRejected = state?.status === 'rejected'
//   // if (isRejected) {
//   //   // window.location.href = '/'
//   // }
//   const pathname = usePathname()
//   // if (!isReady) {
//   //   return <Spinner />
//   // }
//   const isAdmin = (state?.data as any)?.role === 'admin'
//   if (!isAdmin && pathname.includes('/admin/')) {
//     return <NotFound />
//   }
//   return <div className={styles.mainLayout}>{children}</div>
// }

// function getUserData() {
//   const store = makeStore()
//   const result = store.getState()?.authUser
//   if (result) {
//     return result
//   }
//   return 'not authorized'
// }

import type React from 'react'

// function getUserData(): RootState['authUser'] | 'uninitialized' {
//   const store = makeStore()
//   const result = store.getState()?.authUser
//   if (result) {
//     return result
//   }
//   return 'uninitialized'
// }

async function PagesLayout({
  children,
}: {
  children: React.ReactNode
}): Promise<React.ReactElement> {
  // const userData = await fetchAuthUser()
  // console.log('userData***: ', userData)

  return <div>{children}</div>
}

export default PagesLayout
