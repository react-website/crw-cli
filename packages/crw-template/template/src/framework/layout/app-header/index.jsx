import React, { memo, useCallback } from 'react'
import PropTypes from 'prop-types'
import { Layout } from 'antd'
import CustomIcon from '@components/custom-icon'
import UserDropdown from '@components/user-dropdown'
import AppLanguage from '@components/app-language'
import AppTheme from '@components/app-theme'
import { updateCollapsedAppSlider } from '@framework/reducer'

import './scss/index.scss'

function AppHeader({
    userInfo
}) {
    return (
        <Layout.Header styleName="app-header">
            <div className="header-menu-wrapper" />
            <div className="header-action-wrapper">
                <AppTheme />
                <AppLanguage />
                <UserDropdown username={userInfo.username} avatar={userInfo.avatar} />
            </div>
        </Layout.Header>
    )
}

AppHeader.defaultProps = {
    userInfo: {}
}

AppHeader.propTypes = {
    userInfo: PropTypes.shape({
        username: PropTypes.string,
        avatar: PropTypes.string
    })
}

export default memo(AppHeader)
