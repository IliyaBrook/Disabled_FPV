import type { ILangProps, TDict, TDir, TLangOptions } from '@/app/types'
import { getDefaultDict } from '@/app/utils/getDefaultDict'
import type { PayloadAction } from '@reduxjs/toolkit'
import { createSlice } from '@reduxjs/toolkit'

export const initialState: ILangProps = {
  lang: 'he',
  dir: 'rtl',
  dict: getDefaultDict,
}
export const localizationSlice = createSlice({
  name: 'localization',
  initialState,
  reducers: {
    setLocalization(
      state,
      action: PayloadAction<{
        lang: TLangOptions
        dir: TDir
        dict: TDict
      }>
    ) {
      state.lang = action.payload.lang
      state.dir = action.payload.dir
      state.dict = action.payload.dict
    },
  },
})
