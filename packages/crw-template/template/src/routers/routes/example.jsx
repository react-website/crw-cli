import lazyLoad from '@helper/lazy-load'

/**
*   menuIndex: 路由显示menu的位置顺序. -1或不写 为不显示在菜单中
 *
*   key: 路由唯一标识, 在language文件夹中配置label
 *
*   activeMenu: 当二级(以上)路由不显示在菜单中时, 需要添加菜单中已知父路径, 保证menu中的高亮状态
 *
*   icon: 菜单的ICON
 *
*   show: 是否显示路由导航
 *
*   target: 当存在时, 表示此路由为外部地址(即path为完整的地址), 会打开新的browser tab
*/

const router = [
    {
        path: '/app/example',
        element: lazyLoad(() => import('@pages/example/main')),
        loader: () => ({
            menuIndex: 1,
            key: 'example.example',
            icon: 'icon-gongchengshi',
            show: true
        })
    }
]

export default router
