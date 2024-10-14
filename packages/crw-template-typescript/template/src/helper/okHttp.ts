import axios, { AxiosInstance, AxiosRequestHeaders, Method, AxiosResponse } from 'axios'
import qs from 'qs'
import { pathToRegexp, Key } from 'path-to-regexp/dist'
import { notification } from 'antd'
import { ContentType, Response } from '@/models/common'

interface RequestParams {
    [key: string]: any
}

interface RequestData {
    [key: string]: any
}

interface RequestOptions {
    method?: Method;
    headers?:  AxiosRequestHeaders;
    contentType?: ContentType;
    params?: RequestParams;
    data?: RequestData;
}

const instance: AxiosInstance = axios.create({
    baseURL: 'http://0.0.0.0:3003',
    timeout: 0,
    method: 'get',
    responseType: 'json',
    headers: {
        'X-Requested-With': 'XMLHttpRequest',
    },
    paramsSerializer(params) {
        return qs.stringify(params, { indices: false })
    }
})

// 请求拦截器
instance.interceptors.request.use((config) => {
    const token = sessionStorage.getItem('token') as string
    if (token) config.headers!.Token = token

    return config
}, (error) => Promise.reject(error))

// 响应拦截器
instance.interceptors.response.use(<T>(response: AxiosResponse<Response<T>>) => {
    const { data: { code, msg, result }, headers } = response
    if (headers.hasAuthorization || headers.token) {
        localStorage.setItem('token', (headers.getAuthorization || headers.token) as string)
    } else {
        // @ts-expect-error eslint-disable-next-line @typescript-eslint/ban-ts-comment
        if (result?.token) localStorage.setItem('token', result.token)
    }

    switch (code) {
        case '4011':
        case '4012':
            window.location.replace('/login')
            break
        default:
            notification.error({ message: msg })
    }
    return response
}, (error) => {
    // 这里用来处理http常见错误，进行全局提示
    let message = ''
    switch (error.response.status) {
        case 400:
            message = '请求错误(400)'
            break
        case 401:
            message = '未授权，请重新登录(401)'
            // 这里可以做清空storage并跳转到登录页的操作
            break
        case 403:
            message = '拒绝访问(403)'
            break
        case 404:
            message = '请求出错(404)'
            break
        case 408:
            message = '请求超时(408)'
            break
        case 500:
            message = '服务器错误(500)'
            break
        case 501:
            message = '服务未实现(501)'
            break
        case 502:
            message = '网络错误(502)'
            break
        case 503:
            message = '服务不可用(503)'
            break
        case 504:
            message = '网络超时(504)'
            break
        case 505:
            message = 'HTTP版本不受支持(505)'
            break
        default:
            message = `连接出错(${error.response.status})!`
    }

    notification.error({ message })
    return Promise.reject({ message })
})

/**
 * 获取请求url
 * @param url
 * @param params
 */
const getUrl = (url: string, params: RequestParams = {}) => {
    let nUrl = url
    const nParams: RequestParams = { ...params }
    const sParams: string[] = []

    const outputKeys: Key[] = []
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
const request = <T>(url: string, {
    method = 'GET',
    headers,
    params = {},
    data = {},
    // hasLoading = true,
    // extra
}: RequestOptions): Promise<AxiosResponse<Response<T>>> => {
    // 设置请求header
    instance.defaults.headers = {
        ...instance.defaults.headers,
        ...headers
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
            return Promise.reject({
                code: '300',
                msg: 'ajax method params server-error!'
            })
        }
    }
}

const okHttp = async <T>(url: string, options: RequestOptions): Promise<T | undefined> => request<T>(url, options).then(response => {
    const { code, msg, result } = response.data

    if (code !== '8000') return Promise.reject({ message: msg, code })
    return result
}).catch(({ code, message }) => Promise.reject({ code: `${code}`, message }))

export default okHttp
