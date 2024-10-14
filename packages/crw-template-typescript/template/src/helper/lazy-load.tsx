import type { AppLoaderFunction, AppLoaderObject } from '@/models/common'

/**
 * 页面懒加载
 * @param filename 文件路径
 * @param fileType 文件类型
 */
export const lazyLoad = (filename: string, fileType: 'component'|'page' = 'page') => async () => {
    let Component = null
    if (fileType === 'component') {
        Component = (await import(`@/components/${filename}`)).default
    }
    if (fileType === 'page') {
        Component = (await import(`@/pages/${filename}/components/main`)).default
    }

    return { Component }
}

export const appLoader = (loaderData: AppLoaderObject): AppLoaderFunction => () => (loaderData)
