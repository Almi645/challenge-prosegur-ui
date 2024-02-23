import React from 'react';
import { Button, Table } from 'antd';
import { EditOutlined, CheckCircleOutlined, MinusCircleOutlined, CheckCircleTwoTone, FileOutlined } from '@ant-design/icons';
import Empty from '../../shared/components/Empty/Index';
import session from '../../shared/utility/session';

import './styles.css';

export default function Items(props) {
    return (
        <Table
            rowKey="id"
            size='small'
            dataSource={props.dataSource}
            locale={{ emptyText: <Empty /> }}
            pagination={{
                showSizeChanger: false,
                showTotal: (total) => `${total} Registro(s) encontrado(s).`
            }}
            columns={[
                {
                    title: 'Opciones',
                    align: 'center',
                    width: 60,
                    render: (item) => {
                        return (
                            <div className='inline-flex'>
                                <Button type='link'
                                    style={{ padding: '0px 6px', height: 'auto', display: session.user()?.profileId === 1 || session.user()?.profileId === 2 ? '' : 'none' }}
                                    onClick={() => props.onGeneratedInvoice(item)}
                                >
                                    Generar Factura
                                </Button>
                            </div>
                        );
                    }
                },
                {
                    title: 'Cliente',
                    key: 'customer',
                    render: (item) => (item.customer.name + ' ' + item.customer.lastName)
                },
                {
                    title: 'Fecha',
                    key: 'date',
                    dataIndex: 'date'
                },
                {
                    title: 'Total',
                    width: 130,
                    align: 'right',
                    key: 'total',
                    render: (item) => (item.total.toFixed(2))
                }
            ]}
        />
    );
}