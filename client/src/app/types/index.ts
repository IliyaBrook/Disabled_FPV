import type dict from '@/app/dictionaries/en.json'

export type TLangOptions = 'en' | 'he'
export type TDict = typeof dict
export type TDir = 'ltr' | 'rtl'

export type IServerPageParams = Promise<{ lang: TLangOptions }>

export interface ILangProps {
  lang: TLangOptions
  dir: TDir
  dict: TDict
}
export type IAuthServerRe =
  | { error: string }
  | {
      id: string
      email: string
      token: string
      role: string
    }
