import React, { memo, useEffect } from 'react'
import { Outlet, useAppDispatch, useAppSelector } from '@/helper'
import { Layout } from 'antd'
import { getUserInfoAction } from '@/pages/login/action'
import AppHeader from '@/components/app-header'
import PageHeader from '@/components/page-header'
// import AppFooter from '@/components/app-footer'
import AppSlider from '@/components/app-slider'

import './scss/index.scss'

const {
    title = '示例工程'
} = window.projectConf

function AppLayout() {
    const userInfo = useAppSelector(state => state.userInfo)
    const dispatch = useAppDispatch()

    useEffect(() => {
        dispatch(getUserInfoAction())
    }, [])

    // if (!userInfo.username) return null

    return (
        <Layout styleName="app-container" hasSider>
            <AppSlider systemName={title} />
            <Layout>
                <AppHeader />
                <Layout>
                    <PageHeader />
                    <Layout.Content>

                        <Outlet />
                    </Layout.Content>
                    {/*<AppFooter />*/}
                </Layout>
            </Layout>
        </Layout>
    )
}

export default memo(AppLayout)
