import React, { memo } from 'react'

function NotFound() {
    React.useEffect(() => {
        console.log('not found 更新了')
    }, [])

    return (
        <div>not found</div>
    )
}

export default memo(NotFound)
