import React, { memo, useMemo } from 'react'
import { Dropdown } from 'antd'
import type { MenuProps } from 'antd'
import CustomIcon from '@/components/custom-icon'
import { updateLanguage } from '@/framework/reducer'
import { useAppSelector, useAppDispatch } from '@helper'
import { LANGUAGES } from '@/conf/constant'
import { LanguageType } from '@/models/common'

import './scss/index.scss'

function AppLanguage() {
    const appLanguage = useAppSelector((state) => state.global.appLanguage)
    const dispatch = useAppDispatch()

    const handleClick: MenuProps['onClick'] = ({ key }) => {
        dispatch(updateLanguage(key as LanguageType))
    }

    const menuItems = useMemo(() => LANGUAGES.map(({
        name,
        value,
        icon
    }) => ({
        label: name,
        key: value,
        icon: <CustomIcon type={icon} />
    })), [])


    const curIcon = useMemo(() => {
        const item = LANGUAGES.find(item => item.value === appLanguage)
        return item?.icon
    }, [appLanguage])


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
                    <CustomIcon type={curIcon!} />
                </div>
            </Dropdown>
        </div>
    )
}

export default memo(AppLanguage)
