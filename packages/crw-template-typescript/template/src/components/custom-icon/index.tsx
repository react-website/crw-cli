import { memo } from 'react'
import { createFromIconfontCN } from '@ant-design/icons'
//  @ts-expect-error eslint-disable-next-line @typescript-eslint/ban-ts-comment
import comIcon from '@react-website/com-icon'

const CustomIcon = createFromIconfontCN({
    scriptUrl: [comIcon]
})

export default memo(CustomIcon)
