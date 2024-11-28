import { authUser } from '@/app/store/thunks'
import { apiUrl } from '@/app/utils/constants'
import { modalSlice, localizationSlice } from './slices'
import { combineReducers, configureStore } from '@reduxjs/toolkit'

const rootReducer = combineReducers({
  [localizationSlice.name]: localizationSlice.reducer,
  [modalSlice.name]: modalSlice.reducer,
  [authUser.reducerPath]: authUser.reducer,
})

export const store = configureStore({
  reducer: rootReducer,
  devTools: process.env.NODE_ENV !== 'production',
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(authUser.middleware),
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
