import React from 'react';
import { SearchOutlined, PlusOutlined, FileOutlined } from '@ant-design/icons';
import { Button, Row, Col, Space, Typography } from 'antd';
import product from '../../assets/icons/product/01.svg';

import './styles.css';

export default function Header(props) {
    return (
        <Row wrap={true} className='mb-15'>
            <Col flex="auto">
                <div className='vertical-center'>
                    <Space wrap>
                        <FileOutlined style={{ fontSize: 22 }} />
                        <span className='title-page'>Ordenes</span>
                    </Space>
                </div>
            </Col>
            <Col flex="none">
                <Space wrap>
                    <Button
                        shape="round"
                        icon={<SearchOutlined />}
                        onClick={props.onLoad}
                    >
                        Buscar
                    </Button>
                    <Button
                        type='primary'
                        shape='round'
                        icon={<PlusOutlined />}
                        onClick={props.onNew}
                    >
                        Nuevo
                    </Button>
                </Space>
            </Col>
        </Row>
    );
}