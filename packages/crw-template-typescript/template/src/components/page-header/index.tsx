import React, { memo, useMemo } from 'react'
import { Breadcrumb } from 'antd'
import { useMatches, useTranslation, Link } from '@/helper'

import './scss/index.scss'

function PageHeader() {
    const matches = useMatches()
    const { t } = useTranslation()

    const items = useMemo(() => {
        const pages: any[] = matches.slice(2)

        if (pages.every((p: { data: { menu: boolean, subHeader: boolean } }) => p.data.menu && p.data.subHeader)) {
            return pages.map((item: any, ind: number, arr: any[]) => {
                const { id, pathname } = item
                if (ind === arr.length - 1) return { title: t(id) }

                return { title: <Link to={{ pathname }}>{t(id)}</Link> }
            })
        }

        return []
    }, [matches, t])

    if (!items.length) return null

    return (
        <div styleName="page-header">
            <Breadcrumb items={items} />
            <div className="header-extra"></div>
        </div>
    )
}

export default memo(PageHeader)
