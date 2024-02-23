import React, { useState, useEffect } from 'react';
import { Row, Col, Form } from 'antd';

import orderService from '../../shared/services/orderService';
import global from '../../shared/utility/global';

import Header from './Header';
import Filter from './Filter';
import Items from './Items';
import OrderModalForm from './OrderModalForm';
import GeneratedInvoiceModalForm from './GeneratedInvoiceModalForm';

export default function Index(props) {
    const [id, setId] = useState(0);
    const [items, setItems] = useState([]);
    const [filteredItems, setFilteredItems] = useState([]);
    const [filterForm] = Form.useForm();
    const [openForm, setOpenForm] = useState(false);
    const [openGeneratedInvoiceForm, setOpenGeneratedInvoiceForm] = useState(false);

    useEffect(() => {
        onLoad();
    }, []);

    const onLoad = async () => {
        const items = await orderService.get();
        setItems(items);
        setFilteredItems(items);
    }

    const onGeneratedInvoice = (item) => {
        setId(item.id);
        setOpenGeneratedInvoiceForm(true);
    };

    const onSearch = () => {
        const formValues = filterForm.getFieldsValue();
        const filtered = items.filter(item => {
            return global.formatSearch(item.name).match(global.formatSearch(formValues.keyword));
        });
        setFilteredItems(filtered);
    };

    return (
        <Row justify='center'>
            <Col span={24}>
                <Header
                    onNew={() => {
                        setOpenForm(true);
                        setId(0);
                    }}
                    onLoad={onLoad}
                />
                <Filter
                    form={filterForm}
                    onSearch={onSearch}
                />
                <Items
                    dataSource={filteredItems}
                    onGeneratedInvoice={onGeneratedInvoice}
                />
                <OrderModalForm
                    id={id}
                    open={openForm}
                    onLoad={onLoad}
                    onCancel={() => {
                        setOpenForm(false)
                        setId(0);
                    }}
                />
                <GeneratedInvoiceModalForm
                    orderId={id}
                    open={openGeneratedInvoiceForm}
                    onLoad={onLoad}
                    onCancel={() => {
                        setOpenGeneratedInvoiceForm(false)
                        setId(0);
                    }}
                />
            </Col>
        </Row>
    );
}