import Scaffold from '@pages/scaffold'

/**
 * meta: 路由元信息
 *   menuIndex: 路由显示menu的位置顺序. -1 为不显示在菜单中
 *   key: 路由唯一标识
 *   label: 菜单的标题
 *   icon: 菜单的ICON
 */
const scaffoldRouter = [
    {
        path: 'scaffold',
        Component: Scaffold,
        index: true,
        meta: {
            menuIndex: 1,
            key: 'scaffold',
            icon: 'icon-gongchengshi'
        }
    }
]

export default scaffoldRouter
