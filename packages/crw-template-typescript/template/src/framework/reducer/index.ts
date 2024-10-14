import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { getBrowserLanguage } from '@helper'
import { LanguageType } from '@/models/common'

interface GlobalState {
    appLanguage: LanguageType;
    appTheme: string;
    collapsedAppSlider: boolean;
}

const initialState: GlobalState = {
    appLanguage: getBrowserLanguage(), // 当前系统语言
    appTheme: 'light', // 当前系统主题
    collapsedAppSlider: false // 侧边栏是否折叠
}

const reducers = {
    /**
     * 更新系统主题
     * @param state
     * @param action
     */
    updateTheme: (state: GlobalState, action: PayloadAction<string>) => ({
        ...state,
        appTheme: action.payload
    }),

    /**
     * 更新系统语言
     * @param state
     * @param action
     */
    updateLanguage: (state: GlobalState, action: PayloadAction<LanguageType>) => ({
        ...state,
        appLanguage: action.payload
    }),

    /**
     * 更新侧边栏显示
     * @param state
     * @param action
     */
    updateCollapsedAppSlider: (state: GlobalState, action: PayloadAction<boolean>) => ({
        ...state,
        collapsedAppSlider: action.payload
    })
}

export const globalSlice = createSlice({
    name: 'global',
    initialState,
    reducers
})

export const {
    updateTheme,
    updateLanguage,
    updateCollapsedAppSlider
} = globalSlice.actions

export default globalSlice.reducer
