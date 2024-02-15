import React from 'react'
import { createBrowserRouter, redirect, Navigate } from 'react-router-dom'
import Login from '@pages/login/main'
import AppRoot from '@framework/layout/app-root'
import AppLayout from '@framework/layout/app-layout'

import ServerError from '@components/server-error'
import NotFound from '@components/not-found'

/**
 * caseSensitive?: 区分大小写
 *
 * path?: 路径
 *
 * id?: 唯一标识
 *
 *     loader?: 进入页面加载
 *
 *     action?: AgnosticIndexRouteObject["action"];
 *
 *     hasErrorBoundary?: AgnosticIndexRouteObject["hasErrorBoundary"];
 *
 *     shouldRevalidate?: AgnosticIndexRouteObject["shouldRevalidate"];
 *
 *     handle?: AgnosticIndexRouteObject["handle"];
 *
 *     index: true; // 进入首先加载子页面
 *
 *     children?: // 子路由
 *
 *     element?: // 渲染组件
 *
 *     hydrateFallbackElement?: React.ReactNode | null;
 *
 *     errorElement?: React.ReactNode | null;
 *
 *     Component?: // 渲染组件
 *
 *     HydrateFallback?: React.ComponentType | null;
 *
 *     ErrorBoundary?: React.ComponentType | null;
 *
 *     lazy?: // 懒加载组件
 */

// 合成路径
const mergePath = (path, baseUrl = '/app') => (path.startsWith('/') ? `${baseUrl}${path}` : `${baseUrl}/${path}`)

// 添加默认路由
const addIndexRoute = (routes, baseUrl) => {
    const routeItems = []

    routes.forEach((item) => {
        const {
            index,
            path,
            children,
            ...other
        } = item

        let route = { path, children, ...other }

        const url = mergePath(path, baseUrl)

        if (children && children.length > 0) {
            route = {
                ...route,
                children: addIndexRoute(children, url)
            }
        }

        if (index) {
            routeItems.push({ index: true, element: <Navigate to={url} /> })
        }

        routeItems.push(route)
    })

    return routeItems
}

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

const routes = addIndexRoute(loadRoutes(), '/app')

const rootRouters = [
    {
        id: 'root',
        path: '/',
        Component: AppRoot,
        children: [
            {
                index: true,
                element: <Navigate to="/login" />,
            },
            {
                path: 'login',
                Component: Login
            },
            {
                path: 'app',
                Component: AppLayout,
                children: [
                    ...routes,
                ]
            },
            {
                path: '404',
                Component: NotFound,
                meta: {
                    requireAuth: false,
                    title: '404页面',
                    key: '404',
                },
            },
            {
                path: '500',
                Component: ServerError,
                meta: {
                    requireAuth: false,
                    title: '500页面',
                    key: '500',
                },
            },
            {
                path: 'logout',
                async action() {
                    return redirect('/')
                },
            }
        ]
    },
    {
        path: '*',
        element: <Navigate to="/login" />
    }
]

export default () => createBrowserRouter(rootRouters)
