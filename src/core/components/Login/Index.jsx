import React, { useState } from 'react';
import { Form, Input, message, Button } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons'
import { Navigate } from 'react-router-dom';
import session from '../../../shared/utility/session';
import userService from '../../../shared/services/userService'

import global from '../../../shared/utility/global';
import Loading from '../../../shared/components/Loading/Index';

import './styles.css';

export default function Index(_) {
    const [form] = Form.useForm();
    const [loading, setLoading] = useState(false);

    const onSubmit = async () => {
        setLoading(true);

        await form.validateFields()
            .then(async (values) => {
                var response = await userService.auth(values);

                if (response.status === 200) {
                    localStorage.setItem('session', JSON.stringify(response.data));
                }
                else if (response.status === 400)
                    message.error('Usuario y/o contraseña incorrecto(s).', 5);
                else
                    message.error('Ocurrió un error inesperado, por favor vuelva a intentarlo más tarde.', 6);
            })
            .catch((error) => {
                console.log(error);
                message.warning('Complete los datos del formulario.', 5);
            });
        setLoading(false);
    };

    if (session.isAuthenticated()) {
        return (<Navigate to='/' />);
    }

    return (
        <div id="core-components-login">
            <div className="content-main">
                <div className="content-border">
                    <Loading visible={loading} size="xxx-large" height='100%'>
                        <div className="vertical-center">
                            <div className="text-center w-100" style={{ zIndex: '1', padding: 10 }} >
                                <div>
                                    <span className="project-text">
                                        Acceso
                                    </span>
                                </div>
                                <Form form={form} name="login-form" className="mt-15" onFinish={onSubmit}>
                                    <Form.Item className="input-login" name="username" rules={[{ required: true, message: null }]}>
                                        <Input
                                            prefix={<UserOutlined style={{ color: '#157137' }} />}
                                            placeholder="Usuario"
                                            autoComplete="off"
                                        />
                                    </Form.Item>
                                    <Form.Item className="input-login" name="password" rules={[{ required: true, message: '' }]}>
                                        <Input.Password
                                            prefix={<LockOutlined style={{ color: '#157137' }} />}
                                            autoComplete="off"
                                            placeholder="Contraseña"
                                        />
                                    </Form.Item>

                                    <div className="mt-15">
                                        <Button type="primary" htmlType="submit">Ingresar</Button>
                                    </div>
                                </Form>
                            </div>
                        </div>
                        <div className="footer">© Facture Soft. Todos los derechos reservados {global.fetchCurrentYear()}</div>
                    </Loading>
                </div>
            </div>
        </div>
    );
}