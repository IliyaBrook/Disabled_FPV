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
export type RootState = ReturnType<typeof rootReducer>

export const makeStore = (preloadedState?: Partial<RootState>) =>
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
    preloadedState,
  })

export type AppStore = ReturnType<typeof makeStore>
export type AppDispatch = AppStore['dispatch']

// export const store = configureStore({
//   reducer: rootReducer,
//   devTools: process.env.NODE_ENV !== 'production',
//   middleware: (getDefaultMiddleware) => {
//     const middlewareArray = [
//       authUser.middleware,
//       coursesThunk.middleware,
//       coursePageThunk.middleware,
//     ]
//     return getDefaultMiddleware().concat(...middlewareArray)
//   },
// })
//
// export type RootState = ReturnType<typeof store.getState>
// export type AppDispatch = typeof store.dispatch
