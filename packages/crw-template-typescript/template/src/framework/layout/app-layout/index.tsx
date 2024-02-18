import React, { memo, useEffect } from 'react'
import { Outlet } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { Layout, Drawer } from 'antd'
import { getUserInfoAction } from '@pages/login/reducer'
import PageHeader from '@components/page-header'
import AppHeader from '../app-header'
import AppFooter from '../app-footer'
import AppSlider from '../app-slider'
import AppSetting from '../app-setting'

import './scss/index.scss'

function AppLayout() {
    const appSlider = useSelector((state) => state.global.appSlider)
    const dispatch = useDispatch()

    useEffect(() => { dispatch(getUserInfoAction()) }, [])

    return (
        <Layout styleName="app-container">
            <Layout>
                <AppSlider systemName="WELCOME" />
                <Layout>
                    <AppHeader />
                    <Layout>
                        <Layout.Content>
                            <PageHeader />
                            <Outlet />
                        </Layout.Content>
                        <AppFooter />
                    </Layout>
                </Layout>
            </Layout>
            <Drawer
                destroyOnClose
                open={appSlider}
                size="458px"
                footer={false}
                header="页面配置"
            >
                <AppSetting />
            </Drawer>
        </Layout>
    )
}

export default memo(AppLayout)
