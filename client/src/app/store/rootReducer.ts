import { combineReducers } from '@reduxjs/toolkit'
import { setLocalization } from './slices/localization.slice'

const rootReducer = combineReducers({
  localization: setLocalization,
})

export default rootReducer
