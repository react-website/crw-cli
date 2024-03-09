import { createAsyncThunk } from '@reduxjs/toolkit'
import okHttp from '@helper/okHttp'
import { users, getTypePrefix  } from '@/api'

/**
 * 用户登录
 * @returns {Promise<void>}
 */
export const loginAction = createAsyncThunk(
    getTypePrefix(users.login),
    async (data) => await okHttp(users.login, {
        method: 'POST',
        data
    })
)

/**
 * 获取用户信息
 * @returns {Promise<void>}
 */
export const getUserInfoAction = createAsyncThunk(
    getTypePrefix(users.getUserInfo),
    async (data) => await okHttp(users.getUserInfo, {
        method: 'POST',
        data
    })
)
