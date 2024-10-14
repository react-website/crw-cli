import React from 'react'
import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux'
import { notification } from 'antd'
import RootView from '@/framework/root'
import store from '@/framework/store'

import './css/index.scss'

notification.config({
    placement: 'topRight',
    top: 50,
    duration: 3,
    rtl: true
})

createRoot(document.getElementById('root') as HTMLElement)
    .render(
        <Provider store={store}>
            <RootView />
        </Provider>
    )

