import React, { memo } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Dropdown, Menu } from 'antd'
import CustomIcon from '@components/custom-icon'
import { updateLanguage } from '@framework/reducer'
import { LANGUAGES } from '@/language/loader'

import './scss/index.scss'

const languageIconMap = {
    'en-US': 'icon-zhongyingwenyingwen',
    'zh-CN': 'icon-a-zhongyingwenzhongwen'
}

function AppLanguage() {
    const appLanguage = useSelector((state) => state.global.appLanguage)
    const dispatch = useDispatch()

    const menuItems = React.useMemo(() => LANGUAGES.map(({
        name,
        value
    }) => ({
        label: name,
        key: value,
        icon: <CustomIcon type={languageIconMap[value]} />
    })), [])

    const handleClick = ({ key }) => {
        dispatch(updateLanguage(key))
    }

    return (
        <div styleName="language-dropdown-comp">
            <Dropdown
                menu={{
                    items: menuItems,
                    selectedKeys: [appLanguage],
                    onClick: handleClick
                }}
                placement="bottom"
                arrow
            >
                <div className="language-dropdown">
                    <CustomIcon type={languageIconMap[appLanguage]} />
                </div>
            </Dropdown>
        </div>
    )
}

export default memo(AppLanguage)
