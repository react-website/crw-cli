export * as users from './users'

/**
 * 处理url, 主要用于redux typePrefix
 * @param url
 * @returns {string}
 */
export const getTypePrefix = (url) => `${url}`.slice(1).replaceAll('/', '_').toLowerCase()
