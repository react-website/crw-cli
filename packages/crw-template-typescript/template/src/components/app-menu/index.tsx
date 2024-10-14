import React, { memo, useEffect, useMemo, useState } from 'react'
import { useNavigate, useTranslation, useMatches } from '@/helper'
import { Menu, MenuProps } from 'antd'
import { getAppRoute } from '@/routers'
import CustomIcon from '@/components/custom-icon'
import { AppLoaderFunction, RouteObject, TFunction } from '@/models/common'

import './scss/index.scss'

const walk = (routes: RouteObject[] = [], fn:  TFunction, basePaths: string[], roles: string[] = []): any[] => {
    const results: any[] = []

    routes.forEach(({ id, path, loader, children }) => {
        const paths = [...basePaths]

        if (loader && typeof loader === 'function') {
            const { menuShow, icon, target } = (loader as AppLoaderFunction)()

            if (menuShow) {
                paths.push(path as string)

                const menuItem: any = {
                    key: id,
                    path: paths.join('/'),
                    label: fn(id as string),
                    icon: icon ? <CustomIcon type={icon} /> : null,
                    target,
                    children: null
                }

                if (children && children.length > 0) {
                    const subMenus = walk(children, fn, paths, roles)
                    if (subMenus.length > 0) menuItem.children = subMenus
                }

                if (!roles.includes(id as string)) results.push(menuItem)
            }
        }
    })

    return results
}

function AppMenu() {
    const [selectedKeys, setSelectedKeys] = useState<string[]>([])
    const navigate = useNavigate()
    const matches = useMatches()
    const { t } = useTranslation()

    const handleClick: MenuProps['onClick'] = ({ key, item }) => {
        setSelectedKeys([key] as string[])
        navigate((item as unknown as { props: { path: string }}).props.path)
    }

    useEffect(() => {
        const ids = matches.slice(2).filter(item => item.id).map(item => item.id)
        setSelectedKeys(ids)
    }, [])

    const menuItems = useMemo(() => walk(getAppRoute(), t, ['/app']), [])
    const defaultOpenKeys = useMemo(() => getAppRoute().filter(item => item.id).map(item => item.id), [])

    return (
        <div styleName="app-menu-comp">
            <Menu
                mode="inline"
                onClick={handleClick}
                selectedKeys={selectedKeys}
                defaultOpenKeys={defaultOpenKeys}
                items={menuItems}
            />
        </div>
    )
}

export default memo(AppMenu)
