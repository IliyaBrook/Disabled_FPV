import {
  combineReducers,
  configureStore,
  type EnhancedStore,
} from '@reduxjs/toolkit'
import localizationReducer from './slices/localization.slice'

const rootReducer = combineReducers({
  localization: localizationReducer,
})

export const makeStore = (): EnhancedStore =>
  configureStore({
    reducer: rootReducer,
    devTools: process.env.NODE_ENV !== 'production',
  })

export type AppStore = ReturnType<typeof makeStore>
export type RootState = ReturnType<typeof rootReducer>
export type AppDispatch = AppStore['dispatch']
