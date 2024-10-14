import { createAppAsyncThunk, okHttp } from '@/helper'
import { users, typePrefix } from '@/api'
import { LoginParams, LoginState } from '@/models/login-slice'

/**
 * 用户登录
 */
export const loginAction = createAppAsyncThunk(
    typePrefix(users.loginUrl),
    async (data: LoginParams) => await okHttp<LoginState>(users.loginUrl, {
        method: 'POST',
        data,
    })
)

// 获取用户信息
export const getUserInfoAction = createAppAsyncThunk(
    typePrefix(users.getUserInfoUrl),
    async () => await okHttp<LoginState>(users.getUserInfoUrl, {
        method: 'POST'
    })
)
