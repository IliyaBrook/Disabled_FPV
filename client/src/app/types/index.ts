import type dict from '@/app/dictionaries/en.json'

export type TLangOptions = 'en' | 'he'
export type TDict = typeof dict
export type TDir = 'ltr' | 'rtl'

export interface ILangProps {
  lang: TLangOptions
  dict: TDict
}
