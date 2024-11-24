import type { TDict, TDir, TLangOptions } from '@/app/types/local.types'

export type IServerPageParams = Promise<{ lang: TLangOptions }>

export interface ILangPageProps {
  lang: TLangOptions
  dir: TDir
  dict: TDict
}
