import { configureStore, combineReducers } from '@reduxjs/toolkit'
import logger from 'redux-logger'
import globalReducer from '../reducer'
import userInfo from '@/pages/login/reducer'

const isProd = process.env.NODE_ENV === 'production'

const store = configureStore({
    reducer: combineReducers({
        global: globalReducer,
        userInfo
    }),
    devTools: !isProd,
    middleware: (getDefaultMiddleware) => {
        if (isProd) return getDefaultMiddleware({ serializableCheck: false })
        return getDefaultMiddleware({ serializableCheck: false }).concat(logger)
    }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export default store
