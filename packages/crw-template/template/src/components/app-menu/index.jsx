import React, { memo } from 'react'
import { useNavigate, useMatches } from 'react-router-dom'
import { Menu } from 'antd'
import { useTranslation } from 'react-i18next'
import CustomIcon from '../custom-icon'

import './scss/index.scss'

const getRoutes = () => {
    const routes = []
    const routeContext = require.context('@/routers/routes', false, /\.js(x)$/)

    routeContext.keys().forEach((key) => {
        const context = routeContext(key)
        const route = context.default || context

        routes.push(...route)
    })
    return routes
}

const walk = (fn, routes = []) => {
    let results = []
    routes.forEach(({ path, loader, children }) => {
        const data = loader && loader()

        if (data && data.menuIndex && data.menuIndex > 0) {
            const { menuIndex, icon, key, target } = data

            const item = {
                key: path,
                path,
                label: fn(key),
                icon: <CustomIcon type={icon} />,
                menuIndex,
                target
            }

            if (children && children.length > 0) {
                const c = walk(fn, children)
                item.children = c.length > 0 ? c : null
            }

            results.push(item)
        }
    })
    results = results.sort((a, b) => a.menuIndex - b.menuIndex).map(({ menuIndex, ...item }) => (item))
    return results
}

function AppMenu() {
    const [selectedKeys, setSelectedKeys] = React.useState('')
    const navigate = useNavigate()
    const matches = useMatches()
    const { t } = useTranslation()
    const menuItems = walk(t, getRoutes())

    const handleClick = ({ item: { props: { target, path }}, key }) => {
        if (target) {
            // window.open(path, target, 'popup,left=100,top=100,width=900,height=800')
            window.open(path, target)
        } else {
            setSelectedKeys(key)
            navigate(key)
        }
    }

    React.useEffect(() => {
        const curMatch = matches[matches.length - 1]
        let activeMenu = curMatch.pathname
        if (curMatch.data && curMatch.data.activeMenu) {
            activeMenu = curMatch.data.activeMenu
        }
        setSelectedKeys(activeMenu)
    }, [matches])

    return (
        <div styleName="app-menu-comp">
            <Menu
                mode="inline"
                theme="dark"
                onClick={handleClick}
                selectedKeys={selectedKeys}
                items={menuItems}
            />
        </div>
    )
}

export default memo(AppMenu)
