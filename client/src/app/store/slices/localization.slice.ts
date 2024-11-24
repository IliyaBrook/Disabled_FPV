import type { ILocalizationState } from '@/app/types/store.types'
import { getDefaultDict } from '@/app/utils/getDefaultDict'
import type { PayloadAction } from '@reduxjs/toolkit'
import { createSlice } from '@reduxjs/toolkit'
import type { TDict, TLangOptions, TDir } from '@/app/types/local.types'

const initialState: ILocalizationState = {
  lang: 'he',
  dir: 'rtl',
  dict: getDefaultDict,
}

const localizationSlice = createSlice({
  name: 'localization',
  initialState,
  reducers: {
    setLocalization(
      state,
      action: PayloadAction<{
        lang: TLangOptions
        dir: TDir
        dictionary: TDict
      }>
    ) {
      state.lang = action.payload.lang
      state.dir = action.payload.dir
      state.dict = action.payload.dictionary
    },
  },
})

export const { setLocalization } = localizationSlice.actions
export default localizationSlice.reducer
