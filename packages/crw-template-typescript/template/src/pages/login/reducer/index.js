import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import okHttp from '@helper/okHttp'

const urlPrefix = '/users'

// 用户URL
const urlMap = {
    login: `${urlPrefix}/login`,
    getUserInfo: `${urlPrefix}/getUserInfo`,
}

const typePrefix = (url) => `${url}`.slice(1).replaceAll('/', '_').toLowerCase()

const initialState = {
    token: '',
    username: '',
    avatar: '',
    type: '',
    phoneNumber: '',
    realName: '',
    gender: '',
    age: 0,
}

// 用户登录
export const loginAction = createAsyncThunk(
    typePrefix(urlMap.login),
    async (data) => await okHttp(urlMap.login, {
        method: 'POST',
        data,
    }),
)

// 获取用户信息
export const getUserInfoAction = createAsyncThunk(
    typePrefix(urlMap.getUserInfo),
    async (data) => await okHttp(urlMap.getUserInfo, {
        method: 'POST',
        data,
    }),
)

const reducers = {
    /**
	 * 更新用户信息
	 * @param state
	 * @param action
	 * @returns {*}
	 */
    updateUserInfo: (state, action) => ({
        ...state,
        ...action.payload,
    }),
}

export const userInfoSlice = createSlice({
    name: 'userInfo',
    initialState,
    reducers,
    extraReducers: (builder) => {
        builder.addCase(loginAction.fulfilled, (state, action) => ({ ...state, token: action.payload }))
        builder.addCase(getUserInfoAction.fulfilled, (state, action) => ({ ...state, ...action.payload }))
    }
})

export const userInfoAction = userInfoSlice.actions

export default userInfoSlice
