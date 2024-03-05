import React, { memo, useCallback } from 'react'
import PropTypes from 'prop-types'
import { useSelector, useDispatch } from 'react-redux'
import { Layout } from 'antd'
import classNames from 'classnames'
import { updateCollapsedAppSlider } from '@framework/reducer'
import AppMenu from '@components/app-menu'
import CustomIcon from '@components/custom-icon'

import './scss/index.scss'

function AppSlider({
    systemName
}) {
    const collapsedAppSlider = useSelector((state) => state.global.collapsedAppSlider)
    const dispatch = useDispatch()

    const setCollapsed = useCallback(() => {
        dispatch(updateCollapsedAppSlider(!collapsedAppSlider))
    }, [dispatch, collapsedAppSlider])

    return (
        <Layout.Sider
            styleName="app-slider"
            collapsedWidth={64}
            collapsed={collapsedAppSlider}
            onCollapse={setCollapsed}
        >
            <header className={classNames('app-slider-header', { collapsed: collapsedAppSlider })}>
                <i className="logo" />
            </header>
            <main className="app-slider-main">
                <AppMenu />
            </main>
            <div className="slider-toggle-btn">
                <CustomIcon
                    type="icon-xiangshang"
                    className={classNames({'icon-open': collapsedAppSlider })}
                    onClick={setCollapsed}
                />
            </div>
        </Layout.Sider>
    )
}

AppSlider.propTypes = {
    systemName: PropTypes.string,
}

AppSlider.defaultProps = {
    systemName: ''
}

export default memo(AppSlider)
