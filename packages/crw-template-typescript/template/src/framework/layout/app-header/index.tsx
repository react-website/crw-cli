import React, { memo, useCallback } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Layout } from 'antd'
import CustomIcon from '@components/custom-icon'
import UserDropdown from '@components/user-dropdown'
import AppLanguage from '@components/app-language'
import AppTheme from '@components/app-theme'
import { updateCollapsedAppSlider } from '@framework/reducer'

import './scss/index.scss'

function AppHeader() {
    const userInfo = useSelector((state) => state.userInfo)
    const collapsedAppSlider = useSelector((state) => state.global.collapsedAppSlider)

    const dispatch = useDispatch()

    const setCollapsed = useCallback((collapsed) => {
        dispatch(updateCollapsedAppSlider(collapsed))
    }, [dispatch])

    return (
        <Layout.Header styleName="app-header">
            <div className="slider-collapse-btn" onClick={() => setCollapsed(!collapsedAppSlider)} role="presentation">
                <CustomIcon type="icon-appstore-fill" />
            </div>
            <div className="header-menu-wrapper" />
            <div className="header-action-wrapper">
                <AppTheme />
                <AppLanguage />
                <UserDropdown username={userInfo.username} avatar={userInfo.avatar} />
            </div>
        </Layout.Header>
    )
}

export default memo(AppHeader)
