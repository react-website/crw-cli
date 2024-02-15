import { configureStore, combineReducers } from '@reduxjs/toolkit'
import logger from 'redux-logger'
import globalReducer from '../reducer'

const isProd = process.env.NODE_ENV === 'production'

/**
 * 获取系统所有的reducer slice
 * @returns {{}}
 */
const importAllReducer = () => {
    const reducers = {}
    const requireContext = require.context('@pages', true, /([a-zA-Z]+)\/reducer\/index\.js$/)
    requireContext.keys().forEach((key) => {
        const context = requireContext(key)

        const { name, reducer } = context.default

        reducers[name] = reducer
    })

    return reducers
}

const reducers = importAllReducer()

export default configureStore({
    reducer: combineReducers({
        ...reducers,
        global: globalReducer,
    }),
    devTools: !isProd,
    middleware: (getDefaultMiddleware) => {
        if (isProd) return getDefaultMiddleware({ serializableCheck: false })
        return getDefaultMiddleware({ serializableCheck: false }).concat(logger)
    },
})
