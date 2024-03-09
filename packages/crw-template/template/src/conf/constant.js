/**
 * 用户类型
 * @type {{keyMap: {admin: number, user: number}, nameMap: {0: string, 1: string}}}
 */
export const userType = {
    keyMap: {
        user: 0,
        admin: 1
    },
    nameMap: {
        0: '普通用户',
        1: '管理员'
    }
}

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

/**
 * redux异步action类型映射
 * @type {{success: string, pending: string, error: string}}
 */
export const reduxAsyncCaseTypeMap = {
    pending: 'pending',
    success: 'fulfilled',
    error: 'rejected'
}
