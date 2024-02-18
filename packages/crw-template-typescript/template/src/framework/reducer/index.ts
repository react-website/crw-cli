import { createSlice } from '@reduxjs/toolkit'
import { getBrowserLanguage } from '@helper'

const initialState = {
    appLanguage: getBrowserLanguage(), // 当前系统语言
    appTheme: 'light', // 当前系统主题
    collapsedAppSlider: false, // 侧边栏是否折叠
}

const reducers = {
    /**
     * 更新系统主题
     * @param state
     * @param action
     */
    updateTheme: (state, action) => ({
        ...state,
        appTheme: action.payload,
    }),

    /**
     * 更新系统语言
     * @param state
     * @param action
     */
    updateLanguage: (state, action) => ({
        ...state,
        appLanguage: action.payload,
    }),
    /**
     * 更新系统侧边栏
     * @param state
     * @param action
     * @returns {*&{appSlider}}
     */
    updateCollapsedAppSlider: (state, action) => ({
        ...state,
        collapsedAppSlider: action.payload
    })
}

export const globalSlice = createSlice({
    name: 'global',
    initialState,
    reducers,
})

export const {
    updateTheme,
    updateLanguage,
    updateCollapsedAppSlider
} = globalSlice.actions

export default globalSlice.reducer
