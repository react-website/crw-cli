import React, { memo } from 'react'
import { useRouteError } from 'react-router-dom'

function ErrorBoundary() {
    const error = useRouteError()
    console.error(error)

    return (
        <div>出错了~~</div>
    )
}

export default memo(ErrorBoundary)
