import { LanguageItem } from '@/models/common'

/**
 * 用户类型
 */
export const userType = ['User', 'Admin']

/**
 * 系统语言
 */
export const LANGUAGES: LanguageItem[] = [
    { value: 'en-US', name: 'English', icon: 'icon-zhongyingwenyingwen' },
    { value: 'zh-CN', name: '简体中文', icon: 'icon-a-zhongyingwenzhongwen' }
]

/**
 * 时间格式化类型
 * @type {{dateTime: string, date: string, dateNoSeparator: string, dateYear: string, dateMonth: string, time: string, dateTimeNoSeparator: string, dateMinute: string, dateWeek: string}}
 */
export const timeFormat = {
    dateMinute: 'YYYY-MM-DD HH:mm',
    dateTime: 'YYYY-MM-DD HH:mm:ss',
    date: 'YYYY-MM-DD',
    dateYear: 'YYYY',
    dateMonth: 'YYYY-MM',
    dateWeek: 'dddd',
    time: 'HH:mm:ss',
    dateTimeNoSeparator: 'YYYYMMDDHHmmss',
    dateNoSeparator: 'YYYYMMDD'
}
