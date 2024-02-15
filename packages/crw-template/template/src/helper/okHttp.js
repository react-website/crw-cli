import axios from 'axios'
import qs from 'qs'
import { pathToRegexp } from 'path-to-regexp/dist'
import { notification } from 'antd'

const instance = axios.create({
    baseURL: '',
    timeout: 0,
    method: 'get',
    responseType: 'json',
    paramsSerializer(params) {
        return qs.stringify(params, { indices: false })
    },
})

// 请求拦截器
instance.interceptors.request.use((config) => ({
    ...config,
    // cancelToken: new axios.CancelToken() // 取消请求
}), (error) => Promise.reject(error))

// 响应拦截器
instance.interceptors.response.use((response) => response, (error) => Promise.reject(error))

/**
 * 获取请求url
 * @param url
 * @param params
 */
const getUrl = (url, params) => {
    let nUrl = url
    const nParams = { ...params }
    const sParams = []

    const outputKeys = []
    pathToRegexp(nUrl, outputKeys)
    outputKeys.forEach((item) => {
        if (nParams[item.name] === undefined) nParams[item.name] = ''
    })

    Object.keys(nParams).forEach((key) => {
        const reg1 = new RegExp(`${key}\\?`, 'gm')
        const reg2 = new RegExp(`${key}`, 'gm')

        if (reg1.test(nUrl) || reg2.test(nUrl)) {
            nUrl = nUrl.replace(reg1, nParams[key]).replace(reg2, nParams[key])
        } else {
            sParams.push(`${key}=${nParams[key]}`)
        }
    })

    return { nUrl, nParams, sParams }
}

// 网络
const request = (url, {
    method = 'GET',
    headers = {},
    contentType = 'application/json; charset=UTF-8',
    params = {},
    data = {},
    // hasLoading = true,
    // extra
}) => {
    // 设置请求header
    instance.defaults.headers = {
        ...instance.defaults.headers,
        ...headers,
        'X-Requested-With': 'XMLHttpRequest',
        'Content-Type': contentType,
    }

    const { nUrl, nParams, sParams } = getUrl(url, params)

    // TODO: 处理loading

    // 处理method
    const ajaxMethod = method.toLowerCase()
    switch (ajaxMethod) {
    case 'get':
        return instance.get(nUrl, { params: nParams })
    case 'post':
        return instance.post(nUrl, data, { params: sParams.length > 0 ? sParams : {} })
    case 'put':
        return instance.put(nUrl, data, { params: sParams.length > 0 ? sParams : {} })
    case 'delete':
        return instance.delete(nUrl, { params: nParams, data })
    case 'patch':
        return instance.patch(nUrl, data, { params: sParams.length > 0 ? sParams : {} })
    default: {
        return Promise.resolve({
            statusCode: 300,
            message: 'ajax method params server-error!'
        })
    }
    }
}

/**
 * 网络请求入口
 * @param url
 * @param options
 * @returns {Promise<*>}
 */
const okHttp = async (url, options) => request(url, options).then((res) => {
    const { data: { statusCode, message, data } } = res

    switch (statusCode) {
    case 200: {
        return data
    }
    case 302: { // 默认跳转指定地址, 指定地址要求为绝对地址
        window.location.href = data
        break
    }
    case 401: { // 未登录, 去登录页面
        window.location.replace('/')
        break
    }
    case 403: { // 无访问权限
        window.location.replace('/app')
        break
    }
    default: {
        return Promise.reject({ message })
    }
    }

    return data
}).catch(({ message, response }) => {
    let errMsg = message
    if (response) errMsg = response.statusText

    notification.error({ message: errMsg })
    return Promise.reject({ message })
})

export default okHttp
