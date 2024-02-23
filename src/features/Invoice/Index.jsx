import React, { useState, useEffect } from 'react';
import { Row, Col, Form } from 'antd';

import invoiceService from '../../shared/services/invoiceService';
import global from '../../shared/utility/global';

import Header from './Header';
import Filter from './Filter';
import Items from './Items';

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
        const items = await invoiceService.get();
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
            </Col>
        </Row>
    );
}