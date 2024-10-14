import { userType } from '@/conf/constant'
import { AsyncThunkAction } from '@reduxjs/toolkit'

export type UserType = typeof userType[number]

export type { TFunction } from 'i18next'
export type { RouteObject } from 'react-router-dom'

export type LanguageType = 'en-US' | 'zh-CN'

export interface LanguageItem {
    value: LanguageType;
    name: string;
    icon: string;
}

export const getFieldType = <T, K extends keyof T>(arr: T[], field: K): T[K][] => arr.map(item => item[field])

export type ContentType =
    'text/html'
    | 'text/plain'
    | 'multipart/form-data'
    | 'application/json'
    | 'application/x-www-form-urlencoded'
    | 'application/octet-stream'

export interface Response<T> {
    code: string;
    msg?: string;
    result?: T
}

export type LoginActionType<T> = AsyncThunkAction<any, T, object>;

export interface AppLoaderObject {
    menuShow: boolean;      // 是否显示在菜单列表
    icon?: string;          // 图标
    target?: string;        // 外部地址
}

export interface AppLoaderFunction {
    (): AppLoaderObject
}
