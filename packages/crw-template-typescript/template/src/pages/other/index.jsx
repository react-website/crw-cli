import React, { memo } from 'react'
import { Outlet } from 'react-router-dom'

import './scss/index.scss'

function Other() {
    return (
        <div styleName="other-page">
            {/* <header>其他</header> */}
            <Outlet />
        </div>
    )
}

export default memo(Other)
