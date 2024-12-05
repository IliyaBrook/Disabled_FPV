import { authUser, coursePageThunk, coursesThunk } from '@/app/store/thunks'
import { combineReducers, configureStore } from '@reduxjs/toolkit'
import { localizationSlice, modalSlice } from './slices'

const rootReducer = combineReducers({
  [localizationSlice.name]: localizationSlice.reducer,
  [modalSlice.name]: modalSlice.reducer,
  [authUser.reducerPath]: authUser.reducer,
  [coursesThunk.reducerPath]: coursesThunk.reducer,
  [coursePageThunk.reducerPath]: coursePageThunk.reducer,
})

/* eslint-disable */
export const makeStore = () =>
  configureStore({
    reducer: rootReducer,
    devTools: process.env.NODE_ENV !== 'production',
    middleware: (getDefaultMiddleware) => {
      const middlewareArray = [
        authUser.middleware,
        coursesThunk.middleware,
        coursePageThunk.middleware,
      ]
      return getDefaultMiddleware().concat(...middlewareArray)
    },
  })

export type AppStore = ReturnType<typeof makeStore>
export type RootState = ReturnType<AppStore['getState']>
export type AppDispatch = AppStore['dispatch']
