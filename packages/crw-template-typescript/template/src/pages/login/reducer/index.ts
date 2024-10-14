import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { getUserInfoAction } from '@/pages/login/action'
import type { LoginState } from '@/models/login-slice'

const initialState: LoginState = {
    token: '',
    username: '',
    avatar: '',
    type: 'User',
    phoneNumber: '',
    realName: '',
    gender: '',
    age: 0,
}

const reducers = {
    /**
     * 更新用户信息
     * @param state
     * @param action
     */
    updateUserInfo: (state: LoginState, action: PayloadAction<LoginState>) => ({
        ...state,
        ...action.payload,
    })
}

export const userInfoSlice = createSlice({
    name: 'userInfo',
    initialState,
    reducers,
    extraReducers: (builder) => {
        builder.addCase(getUserInfoAction.fulfilled, (state: LoginState, action) => {
            return { ...state, ...action.payload as LoginState }
        })
    }
})

export const {
    updateUserInfo
} = userInfoSlice.actions

export default userInfoSlice.reducer
