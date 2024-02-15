import React, { memo } from 'react'
import { Outlet } from 'react-router-dom'

function AppRoot() {
    return <Outlet />
}

export default memo(AppRoot)
