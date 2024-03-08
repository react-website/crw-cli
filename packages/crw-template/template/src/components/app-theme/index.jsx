import React, { memo } from 'react'
import { Dropdown } from 'antd'
import { useSelector, useDispatch } from 'react-redux'
import { updateTheme } from '@framework/reducer'

import './scss/index.scss'

function AppTheme() {
    const appTheme = useSelector((state) => state.global.appTheme)
    const [selectKey, setSelectKey] = React.useState(appTheme)
    const dispatch = useDispatch()

    const prefers = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)')

    const menuItems = [
        {
            label: '浅色',
            key: 'light'
        },
        {
            label: '深色',
            key: 'dark'
        },
        {
            label: '跟随系统',
            key: 'os'
        }
    ]

    const changeTheme = () => {
        const isDark = prefers.matches
        dispatch(updateTheme(isDark ? 'dark' : 'light'))
    }

    const handleClick = ({ key }) => {
        setSelectKey(key)
        if (key === 'os') {
            changeTheme()
            prefers.addEventListener('change', changeTheme)
        } else {
            dispatch(updateTheme(key))
            prefers.removeEventListener('change', changeTheme)
        }
    }

    return (
        <div styleName="theme-dropdown-comp">
            <Dropdown
                menu={{
                    items: menuItems,
                    selectedKeys: [selectKey],
                    onClick: handleClick
                }}
                placement="bottom"
            >
                <div className="theme-dropdown">
                    {appTheme}
                </div>
            </Dropdown>
        </div>
    )
}

export default memo(AppTheme)
