import i18next from 'i18next'

export { default as lazyLoad } from './lazy-load'
export { default as okHttp } from './okHttp'

// 获取当前浏览器的语言
export const getBrowserLanguage = () => (navigator.language ? navigator.language : navigator.userLanguage)

// 切换语言包
export const changeLanguage = async (lng) => {
    if (i18next.language !== lng) return await i18next.changeLanguage(lng)
    return Promise.resolve()
}
