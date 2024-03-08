import React, { memo } from 'react'
import { useMatches, Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { Breadcrumb } from 'antd'

import './scss/index.scss'

function PageHeader() {
    const matches = useMatches()
    const { t } = useTranslation()

    const items = matches
        .filter(item => item.pathname !== '/' && item.pathname !== '/app' && item.data && item.data.show)
        .map(({ pathname, data }, ind, arr) => {
            const title = t(data.key)
            if (ind === arr.length - 1) {
                return { title }
            }
            return {
                title: <Link to={{ pathname }}>{title}</Link>
            }
        })

    return (
        <div styleName="page-header">
            <Breadcrumb items={items} />
        </div>
    )
}

export default memo(PageHeader)
