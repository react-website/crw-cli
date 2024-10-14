import type { RouteObject } from '@/models/common'
import { lazyLoad, redirect, Outlet } from '@/helper'
import example from '@/routers/routes/example'
import error from '@/routers/routes/error'

/**
 * app all routes
 */
export const appRoute = [
    ...example
] satisfies RouteObject[]

/**
 * all routes
 */
const rootRouters = [
    {
        id: 'root',
        path: '/',
        Component: Outlet,
        children: [
            {
                index: true,
                loader: () => redirect('/login')
            },
            {
                path: 'login',
                lazy: lazyLoad('login'),
            },
            {
                id: 'app',
                path: 'app',
                lazy: lazyLoad('app-layout', 'component'),
                children: appRoute
            },
            {
                path: 'logout',
                loader: () => redirect('/login')
            },
            ...error
        ]
    }
] satisfies RouteObject[]

export default rootRouters
