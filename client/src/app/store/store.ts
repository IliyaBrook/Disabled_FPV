import { errorsSlice, localizationSlice, signUpInFormSlice } from './slices'
import { combineReducers, configureStore } from '@reduxjs/toolkit'

const rootReducer = combineReducers({
  [localizationSlice.name]: localizationSlice.reducer,
  [signUpInFormSlice.name]: signUpInFormSlice.reducer,
  [errorsSlice.name]: errorsSlice.reducer,
})

export const store = configureStore({
  reducer: rootReducer,
  devTools: process.env.NODE_ENV !== 'production',
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export type AppStore = typeof store
