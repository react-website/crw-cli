import React, { memo, useEffect } from 'react'
import { Outlet } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { Layout, Drawer } from 'antd'
import { getUserInfoAction } from '@pages/login/action'
import PageHeader from '@components/page-header'
import AppHeader from '../app-header'
import AppSlider from '../app-slider'

import './scss/index.scss'

function AppLayout() {
    const userInfo = useSelector((state) => state.userInfo)

    const dispatch = useDispatch()

    useEffect(() => { dispatch(getUserInfoAction()) }, [])

    if (!userInfo.username) return null

    return (
        <Layout styleName="app-container" hasSider>
            <AppSlider systemName="WELCOME" />
            <Layout>
                <AppHeader useInfo={userInfo} />
                <Layout.Content>
                    <PageHeader />
                    <div className="page-wrapper">
                        <Outlet />
                    </div>
                </Layout.Content>
            </Layout>
        </Layout>
    )
}

export default memo(AppLayout)
