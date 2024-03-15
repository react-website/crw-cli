import React from 'react'
import { createBrowserRouter, Navigate } from 'react-router-dom'
import lazyLoad from '@helper/lazy-load'
import appLoader from './loader/app-loader'

// 加载路由
const loadRoutes = () => {
    const routes = []
    const routeContext = require.context('./routes', false, /\.js(x)$/)

    routeContext.keys().forEach((key) => {
        const context = routeContext(key)
        const route = context.default || context

        routes.push(...route)
    })

    return routes
}

const routes = loadRoutes()

const router = createBrowserRouter([
    {
        id: 'root',
        path: '/',
        element: lazyLoad(() => import('@framework/layout/app-root')),
        children: [
            {
                index: true,
                element: <Navigate to="/app" />
            },
            {
                path: '/login',
                element: lazyLoad(() => import('@pages/login/components/main'))
            },
            {
                path: '/app',
                loader: appLoader,
                element: lazyLoad(() => import('@framework/layout/app-layout')),
                children: [
                    ...routes
                ]
            },
            {
                path: '/not-found',
                element: lazyLoad(() => import('@pages/not-found'))
            },
            {
                path: '*',
                element: <Navigate to="/not-found" />
            }
        ]
    }
])

if (import.meta.hot) {
    import.meta.hot.dispose(() => router.dispose())
}

export default () => router
