import React, { memo } from 'react'
import PropTypes from 'prop-types'
import { Dropdown, Avatar, Menu } from 'antd'
import CustomIcon from '@components/custom-icon'

import './scss/index.scss'

const noop = () => {}

function UserDropdown({
    username,
    avatar,
}) {
    const menuItems = [
        {
            label: '退出',
            key: 'logout',
            icon: <CustomIcon type="icon-zhuxiao" />
        },
    ]

    const handleClick = ({ key }) => {
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
                arrow
            >
                <span>
                    <span className="username">{username}</span>
                    <Avatar
                        src={avatar}
                        style={{ backgroundColor: '#87d068' }}
                        icon={<CustomIcon type="icon-dengluren" />}
                        alt={username}
                    />
                </span>
            </Dropdown>
        </div>
    )
}

UserDropdown.defaultProps = {
    username: '',
    avatar: '',
}

UserDropdown.propTypes = {
    username: PropTypes.string,
    avatar: PropTypes.string,
}

export default memo(UserDropdown)
