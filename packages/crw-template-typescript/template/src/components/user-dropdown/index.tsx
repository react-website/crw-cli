import React, { memo } from 'react'
import { Dropdown, Avatar } from 'antd'
import type { MenuProps } from 'antd'
import CustomIcon from '@/components/custom-icon'

import './scss/index.scss'

interface UserDropdownProps {
    username: string;
    avatar: string;
}

function UserDropdown({
    username,
    avatar,
}: Readonly<UserDropdownProps>) {
    const menuItems = [
        {
            label: '系统设置',
            key: 'system',
            icon: <CustomIcon type="icon-icon13" />
        },
        {
            label: '退出',
            key: 'logout',
            icon: <CustomIcon type="icon-zhuxiao" />
        },
    ]

    const handleClick: MenuProps['onClick'] = ({ key }) => {
        console.log(key, 'userDropdownClick')
    }

    return (
        <div styleName="user-dropdown-comp" role="presentation">
            <Dropdown
                menu={{
                    items: menuItems,
                    onClick: handleClick
                }}
                placement="bottomRight"
            >
                <span>
                    <span className="username">{username}</span>
                    <Avatar
                        src={avatar}
                        icon={<CustomIcon type="icon-dengluren" />}
                        alt={username}
                    />
                </span>
            </Dropdown>
        </div>
    )
}

export default memo(UserDropdown)
