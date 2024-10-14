import { lazyLoad, redirect } from '@/helper'
import type { RouteObject } from '@/models/common'

const errorRoute = [
    {
        path: 'not-found',
        lazy: lazyLoad('not-found')
    },
    {
        path: '*',
        loader: () => redirect('/not-found')
    }
] satisfies RouteObject[]

export default errorRoute
