import React, { memo } from 'react'
import { Switch } from 'antd'
import { useSelector, useDispatch } from 'react-redux'
import { updateTheme } from '@framework/reducer'

function AppTheme() {
    const appTheme = useSelector((state) => state.global.appTheme)
    const dispatch = useDispatch()

    const handleClick = (checked) => {
        dispatch(updateTheme(checked ? 'light' : 'dark'))
    }

    return (
        <div className="user-dropdown">
            <Switch
                checkedChildren="浅"
                unCheckedChildren="深"
                defaultChecked={appTheme === 'light'}
                onClick={handleClick}
            />
        </div>
    )
}

export default memo(AppTheme)
