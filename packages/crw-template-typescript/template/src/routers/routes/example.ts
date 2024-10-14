import { lazyLoad, appLoader, redirect } from '@/helper'
import type { RouteObject } from '@/models/common'

const  router = [
    {
        index: true,
        loader: () => redirect('/app/example')
    },
    {
        id: 'example',
        path: 'example',
        loader: appLoader({ menuShow: true }),
        lazy: lazyLoad('example')
    }
] satisfies RouteObject[]

export default router
