'use client'

import type { TDict, TDir, TLangOptions } from '@/app/types/local.types'
import React, { createContext } from 'react'

interface IDictContext {
  dictionary: TDict
  lang: TLangOptions
  dir: TDir
  children: React.ReactNode
}

export const DictionaryContext = createContext<Omit<
  IDictContext,
  'children'
> | null>(null)

export const DictionaryProvider = ({
  children,
  dictionary,
  dir,
  lang,
}: IDictContext): React.ReactNode => {
  return (
    <DictionaryContext.Provider value={{ dictionary, lang, dir }}>
      {children}
    </DictionaryContext.Provider>
  )
}

export default function DictionaryClientProvider({
  children,
  dictionary,
  dir,
  lang,
}: IDictContext): React.ReactNode {
  return (
    <DictionaryProvider dictionary={dictionary} dir={dir} lang={lang}>
      {children}
    </DictionaryProvider>
  )
}
