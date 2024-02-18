import Other from '@pages/other'
import Table from '@pages/table'
import List from '@pages/list'

/**
 * meta: 路由元信息
 *
 *   menuIndex: 路由显示menu的位置顺序. -1 为不显示在菜单中
 *
 *   key: 路由唯一标识
 *
 *   label: 菜单的标题
 *
 *   icon: 菜单的ICON
 */
const otherRouter = [
    {
        path: 'other',
        Component: Other,
        meta: {
            menuIndex: 2,
            key: 'other',
            icon: 'icon-shaixuan2'
        },
        children: [
            {
                path: 'table',
                index: true,
                Component: Table,
                meta: {
                    menuIndex: 1,
                    key: 'table',
                    icon: 'icon-icon4'
                }
            },
            {
                path: 'list',
                Component: List,
                meta: {
                    menuIndex: 2,
                    key: 'list',
                    label: '列表',
                    icon: 'icon-icon11'
                }
            }
        ]
    }
]

export default otherRouter
