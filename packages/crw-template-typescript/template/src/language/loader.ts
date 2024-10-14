import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import { getBrowserLanguage } from '@helper'
import enUS from '@/language/en-US'
import zhCN from '@/language/zh-CN'

i18n.use(initReactI18next)
    .init({
        resources: {
            'en-US': { translation: enUS },
            'zh-CN': { translation: zhCN }
        },
        debug: false,
        // load: 'all',
        lng: getBrowserLanguage(),
        fallbackLng: 'zh-CN',
        interpolation: {
            escapeValue: false // not needed for react as it escapes by default
        }
    })

export default i18n
