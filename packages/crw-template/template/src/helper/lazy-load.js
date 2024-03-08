import React, { Suspense, lazy } from 'react'
import Loading from '@components/loading'

function LazyLoad(component) {
    const Component = lazy(component)

    return (
        <Suspense fallback={<Loading />}>
            <Component />
        </Suspense>
    )
}

export default LazyLoad
