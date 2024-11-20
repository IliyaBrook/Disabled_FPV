'use client'

import React, { createContext, useContext } from 'react'
import type { TDict } from '@/app/types/local.types'

export const DictionaryContext = createContext<TDict | null>(null)

export const DictionaryProvider = ({
  children,
  dictionary,
}: {
  children: React.ReactNode
  dictionary: TDict
}): React.ReactNode => {
  return (
    <DictionaryContext.Provider value={dictionary}>
      {children}
    </DictionaryContext.Provider>
  )
}

export default function DictionaryClientProvider({
  children,
  dictionary,
}: {
  children: React.ReactNode
  dictionary: TDict
}): React.ReactNode {
  return (
    <DictionaryProvider dictionary={dictionary}>{children}</DictionaryProvider>
  )
}
