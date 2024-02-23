import React from 'react';
import { Form, Input, Row, Col } from 'antd';
import { FilterOutlined } from '@ant-design/icons';

import './styles.css';

export default function Filter(props) {
    return (
        <Form
            form={props.form}
            className={'mb-15'}
            initialValues={{
                keyword: ''
            }}
        >
            <Row gutter={[17]}>
                <Col span={24}>
                    <div className='content-filter inline-flex w-100'>
                        <Form.Item name="keyword" noStyle>
                            <Input
                                prefix={<FilterOutlined className='font-size-16' style={{ marginRight: 5 }} />}
                                placeholder="Buscar por palabra clave"
                                autoComplete="off"
                                bordered={false}
                                onKeyUp={(e) => {
                                    e.preventDefault();
                                    if (e.keyCode === 13)
                                        props.onSearch();
                                }}
                            />
                        </Form.Item>
                    </div>
                </Col>
            </Row>
        </Form>
    );
}