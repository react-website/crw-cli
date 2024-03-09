import i18next from 'i18next'
import conf from '@/conf'

const {
    constant: {
        reduxAsyncCaseTypeMap
    }
} = conf

/**
 * 获取当前浏览器的语言
 * @returns {string}
 */
export const getBrowserLanguage = () => (navigator.language ? navigator.language : navigator.userLanguage)

// 切换语言包
export const changeLanguage = async (lng) => {
    if (i18next.language !== lng) return await i18next.changeLanguage(lng)
    return Promise.resolve()
}

/**
 * 创建Action
 * @param action
 * @param reducerObj
 * @returns {{extraReducers: extraReducers, reducers: {}}}
 */
export const createActions = (reducerObj, action) => {
    const reducers = {}
    const ers = {}
	
    Object.entries(reducerObj).forEach(([fnName, v]) => {
        if (typeof v === 'function') reducers[fnName] = v
		
        if (typeof v === 'object') {
            const cs = []
            Object.entries(v).forEach(([t, fn]) => {
                const ak = reduxAsyncCaseTypeMap[t]
                if (ak && action[fnName]) cs.push({ type: ak, fn })
            })
	        
            ers[fnName] = cs
        }
    })
	
    const extraReducers = (builder) => {
        Object.entries(ers).forEach(([k, cs]) => {
            cs.forEach(({ type, fn }) => {
                builder.addCase(action[k][type], fn)
            })
        })
    }
	
    return {
        reducers,
        extraReducers
    }
}
