import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Menu, Layout, Avatar, Popover, Row, Col, Button, Divider, Badge, Typography, Space } from 'antd';
import { LogoutOutlined, KeyOutlined } from '@ant-design/icons';

import notification from '../../../assets/icons/notification/02.svg';
import session from '../../../shared/utility/session';

import './styles.css';

const { Header } = Layout;
const { Title, Text } = Typography;

export default function LayoutHeader(props) {
    const [fullName, setFullName] = useState("Miguel Mamani Arotoma");

    useEffect(() => {

    }, []);

    const content = () => {
        return (
            <div style={{ width: '300px' }}>
                <div className='padding-10'>
                    <Space align="center">
                        <Avatar size={64} style={{ color: '#fff', backgroundColor: '#ff7875', fontWeight: 500 }}>
                            {(session.user()?.fullname ?? '--').substring(0, fullName.lenght === 1 ? 1 : 2).toUpperCase()}
                        </Avatar>
                        <div>
                            <Title level={5} className='mb-0 mt-0'>{session.user()?.fullname}</Title>
                            <Text>{session.user()?.username}</Text>
                        </div>
                    </Space>
                </div>
                <Divider className='mt-5 mb-10' />
                <Button block
                    icon={<LogoutOutlined />}
                    type="text"
                    onClick={props.onSignOut}
                    className='text-left'
                >
                    Cerrar Sesión
                </Button>

            </div>
        );
    }

    return (
        <Layout>
            <Header className="header">
                <div className="logo">
                    <Link to={'/'}>
                        <span className="title-app">Challenge Prosegur</span>
                    </Link>
                </div>
                <Menu
                    mode="horizontal"
                    items={[
                        {
                            key: 'key-user',
                            style: { padding: '0px' },
                            label: <Popover placement="bottomRight" content={content} trigger="click">
                                <div className="user-content">
                                    <Avatar className="user-avatar">
                                        {fullName.substring(0, fullName.lenght === 1 ? 1 : 2).toUpperCase()}
                                    </Avatar>
                                </div>
                            </Popover>
                        }
                    ]}
                />
            </Header>
        </Layout >
    );
}