import React, { memo } from 'react'
import { RouterProvider } from 'react-router-dom'
import { ConfigProvider, theme } from 'antd'
import { StyleProvider, px2remTransformer } from '@ant-design/cssinjs'
import { I18nextProvider } from 'react-i18next'
import { useAppSelector } from '@helper'
import getRouter from '@/routers'
import i18n from '@/language/loader'

function RootView() {
    const appTheme: string = useAppSelector((state) => state.global.appTheme)

    return (
        <ConfigProvider
            theme={{
                algorithm: appTheme === 'dark'
                    ? [theme.darkAlgorithm]
                    : [theme.defaultAlgorithm],
                cssVar: { prefix: 'crw' },
                hashed: false
            }}
        >
            <StyleProvider transformers={[px2remTransformer({ rootValue: 16 })]}>
                <I18nextProvider i18n={i18n}>
                    <RouterProvider router={getRouter()} />
                </I18nextProvider>
            </StyleProvider>
        </ConfigProvider>
    )
}

export default memo(RootView)
