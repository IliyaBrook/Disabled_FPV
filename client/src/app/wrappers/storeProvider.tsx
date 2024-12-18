'use client'
import { type AppStore, makeStore } from '@/app/store/store'
import React, { useRef } from 'react'
import { Provider } from 'react-redux'

export default function StoreProviderWrapper({
  children,
}: {
  children: React.ReactNode
}): React.ReactNode {
  const storeRef = useRef<AppStore>()
  if (!storeRef.current) {
    storeRef.current = makeStore()
  }
  return <Provider store={storeRef.current}>{children}</Provider>
}
