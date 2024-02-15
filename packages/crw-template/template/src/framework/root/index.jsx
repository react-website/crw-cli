import React, { memo, useCallback } from 'react'
import { RouterProvider } from 'react-router-dom'
import { ConfigProvider, theme } from 'antd'
import { StyleProvider, px2remTransformer } from '@ant-design/cssinjs'
import { useSelector, useDispatch } from 'react-redux'
import { I18nextProvider } from 'react-i18next'
import i18n from '@/language/loader'
import ErrorBoundary from '@components/error-boundary'
import getRouter from '@/routers'
import { updateLanguage } from '@framework/reducer'
import { changeLanguage } from '@helper'

import light from '@/css/theme/light'
import dark from '@/css/theme/dark'

const ThemeMap = {
    light,
    dark
}

function RootView() {
    const language = useSelector((state) => state.global.appLanguage)
    const appTheme = useSelector((state) => state.global.appTheme)
    const dispatch = useDispatch()

    const [antdLanguageData, setAntdLanguageData] = React.useState(require(`antd/es/locale/${language.replace('-', '_')}.js`).default)

    // 切换语言版本
    const changeLanguageHandler = useCallback(async (lng) => {
        await changeLanguage(lng)
        setAntdLanguageData(require(`antd/es/locale/${lng.replace('-', '_')}.js`).default)
        if (lng !== language) dispatch(updateLanguage(lng))
    }, [language])

    React.useEffect(() => {
        if (language) changeLanguageHandler(language)
    }, [language])

    return (
        <ConfigProvider
            locale={antdLanguageData}
            theme={{
                ...ThemeMap[appTheme],
                cssVar: { prefix: 'crw' },
                hashed: false
            }}
        >
            <StyleProvider transformers={[px2remTransformer({ rootValue: 16 })]}>
                <I18nextProvider i18n={i18n}>
                    <RouterProvider router={getRouter()} fallbackElement={<ErrorBoundary />} />
                </I18nextProvider>
            </StyleProvider>
        </ConfigProvider>
    )
}

export default memo(RootView)
