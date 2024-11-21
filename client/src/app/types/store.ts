import type { TDict, TDir, TLangOptions } from '@/app/types/local.types'

export interface ILocalizationState {
  lang: TLangOptions
  dir: TDir
  dict: TDict
}
