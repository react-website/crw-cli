import React, { memo, useCallback } from 'react'
import { Layout } from 'antd'
import { useAppDispatch, useAppSelector, classNames } from '@helper'
import { updateCollapsedAppSlider } from '@/framework/reducer'
import AppMenu from '@/components/app-menu'

import './scss/index.scss'

interface AppSliderProps {
    systemName: string;
}

function AppSlider({
    systemName
}: Readonly<AppSliderProps>) {
    const collapsedAppSlider = useAppSelector((state) => state.global.collapsedAppSlider)
    const dispatch = useAppDispatch()

    const setCollapsed = useCallback(() => {
        dispatch(updateCollapsedAppSlider(false))
    }, [dispatch])

    return (
        <Layout.Sider
            styleName="app-slider"
            collapsedWidth={64}
            collapsed={collapsedAppSlider}
            onCollapse={setCollapsed}
        >
            <header className={classNames('app-slider-header', { collapsed: collapsedAppSlider })}>
                <i className="logo" />
                <span>{systemName}</span>
            </header>
            <main className="app-slider-main">
                <AppMenu />
            </main>
        </Layout.Sider>
    )
}

export default memo(AppSlider)
