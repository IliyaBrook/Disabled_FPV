import { localizationSlice } from '@/app/store/slices'
import { makeStore } from '@/app/store/store'
import type { TLangOptions } from '@/app/types'

export const dictionaryServer = async () => {
  const store = makeStore()

  const state = store.getState()

  return {
    lang: state.localization.lang,
    dict: state.localization.dict,
  }
}

export const updateDictionaryServer = async (lang: TLangOptions, dict: any) => {
  const store = makeStore()

  store.dispatch(
    localizationSlice.actions.setLocalization({
      lang,
      dir: lang === 'he' ? 'rtl' : 'ltr',
      dict,
    })
  )

  const state = store.getState()

  return {
    lang: state.localization.lang,
    dict: state.localization.dict,
  }
}
