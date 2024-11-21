import { combineReducers, configureStore } from '@reduxjs/toolkit'
import localizationReducer from './slices/localization.slice'

const rootReducer = combineReducers({
  localization: localizationReducer,
})

export const store = configureStore({
  reducer: rootReducer,
  devTools: process.env.NODE_ENV !== 'production',
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
