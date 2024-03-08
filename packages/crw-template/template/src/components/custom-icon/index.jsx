import { memo } from 'react'
import { createFromIconfontCN } from '@ant-design/icons'
import comIcon from '@react-website/com-icon'

const CustomIcon = createFromIconfontCN({
    scriptUrl: [comIcon]
})

export default memo(CustomIcon)
