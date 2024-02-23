import React from 'react';
import { Button, Table } from 'antd';
import { EditOutlined, CheckCircleOutlined, MinusCircleOutlined, CheckCircleTwoTone, FileOutlined } from '@ant-design/icons';
import Empty from '../../shared/components/Empty/Index';

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
                    title: 'Serie',
                    key: 'serie',
                    dataIndex: 'serie'
                },
                {
                    title: 'Documento',
                    key: 'document',
                    dataIndex: 'document'
                },
                {
                    title: 'Fecha',
                    key: 'date',
                    dataIndex: 'date'
                },
                {
                    title: 'Provincia',
                    key: 'province',
                    render: (item) => (item.province.name)
                },
                {
                    title: 'Sub Total',
                    width: 130,
                    align: 'right',
                    key: 'subTotal',
                    render: (item) => (item.subTotal.toFixed(2))
                },
                {
                    title: 'Impuesto',
                    width: 130,
                    align: 'right',
                    key: 'provinceTax',
                    render: (item) => (item.provinceTax.toFixed(2))
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