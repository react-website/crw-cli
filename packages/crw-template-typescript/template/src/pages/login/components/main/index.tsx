import React, { memo, useEffect } from 'react'
import { useAppDispatch, useNavigate, useTranslation, classNames } from '@/helper'
import CustomIcon from '@/components/custom-icon'
import particlesJs from '@/plugins/particles'
import particlesJson from '@/plugins/particlesjs-config.json'
import { Form, Input, Radio, Button } from 'antd'
import type { LoginParams } from '@/models/login-slice'
import { loginAction } from '@/pages/login/action'

import './scss/index.scss'

function Login() {
    const navigate = useNavigate()
    const dispatch = useAppDispatch()
    const { t } = useTranslation()

    const handleSignIn = async (data: LoginParams) => {
        const action: any = await dispatch(loginAction(data))
        if (!(action)?.error) navigate('/app')
    }

    useEffect(() => {
        particlesJs('particles', particlesJson)
    }, [])

    return (
        <div styleName="login-page">
            <div className={classNames('container right-panel-active')}>
                <div className="container-form container-signin">
                    <Form
                        name="basic-sign-up"
                        initialValues={{ userType: 'User' }}
                        onFinish={handleSignIn}
                        autoComplete="off"
                    >
                        <h2 className="system-header">WELCOME</h2>
                        <Form.Item
                            name="username"
                            rules={[{ required: true, message: 'Please input your username!' }]}
                        >
                            <Input
                                prefix={<CustomIcon type="icon-yonghuming" />}
                                placeholder="Username"
                            />
                        </Form.Item>
                        <Form.Item
                            name="password"
                            rules={[{ required: true, message: 'Please input your password!' }]}
                        >
                            <Input.Password
                                prefix={<CustomIcon type="icon-password" />}
                                placeholder="Password"
                            />
                        </Form.Item>
                        <Form.Item name="userType" className="user-type-form-item">
                            <Radio.Group>
                                <Radio value="User">用户</Radio>
                                <Radio value="Admin">管理员</Radio>
                            </Radio.Group>
                        </Form.Item>
                        <Form.Item>
                            <Button type="primary" htmlType="submit" className="form-button">{t('login.login')}</Button>
                        </Form.Item>
                    </Form>
                </div>
                <div className="container-overlay">
                    <div className="overlay">
                        <div className="overlay-panel overlay-left" />
                    </div>
                </div>
            </div>
            <div id="particles" />
        </div>
    )
}

export default memo(Login)
