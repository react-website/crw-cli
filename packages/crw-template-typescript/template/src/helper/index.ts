import i18next from 'i18next'
import { LanguageType } from '@/models/common'

export * from './lazy-load'
export * from './hooks'
export { default as okHttp } from './okHttp'

export { default as classNames } from 'classnames'

/**
 * 获取当前浏览器的语言
 */
export const getBrowserLanguage = (): LanguageType =>
// // const lang = navigator.language

    // // // 英语区的使用美式英语
    // // if (lang.startsWith('en')) return 'en-US'
// //
    // // // 中文区的使用简体中文
    // // if (lang.startsWith('zh')) return 'zh-CN'
//
    // return lang
    'zh-CN'

// 切换语言包
export const changeLanguage = async (lng: LanguageType) => {
    if (i18next.language !== lng) return await i18next.changeLanguage(lng)
    return Promise.resolve()
}
