import { createSlice } from '@reduxjs/toolkit'
import { createActions } from "@helper"
import * as actions from '../action'

const initialState = {
    username: '',
    avatar: '',
    role: ''
}

const reducers = createActions({
    getUserInfoAction: {
        success: (state, action) => {
            const { username, avatar, role } = action.payload

            return { ...state, username, avatar, role }
        }
    }
}, actions)

export const userInfoSlice = createSlice({
    name: 'userInfo',
    initialState,
    ...reducers
})

export default userInfoSlice
