import { DictionaryContext } from '@/app/contexts/dictionaryProvider'
import type { TDict } from '@/app/types/local.types'
import { useContext } from 'react'

export const useDictionary = (): TDict | null => {
  const context = useContext<TDict | null>(DictionaryContext)
  if (!context) {
    throw new Error('useDictionary must be used within a DictionaryProvider')
  }
  return context
}
