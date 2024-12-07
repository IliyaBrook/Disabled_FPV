'use server'
import type { TDict, TLangOptions } from '@/app/types'

const dictionaries = {
  en: () => import('../dictionaries/en.json').then((module) => module.default),
  he: () => import('../dictionaries/he.json').then((module) => module.default),
}

export const getDictionary = async (lang: TLangOptions): Promise<TDict> => {
  if (!dictionaries[lang]) {
    throw new Error(`Dictionary for locale "${lang}" not found`)
  }
  return await dictionaries[lang]()
}
