import React, { useState, useEffect, useContext } from 'react';

import { Modal, Form, Row, Col, Input, Button, Select, ColorPicker, Upload, Space, message, Divider } from 'antd';
import { CloseOutlined, SaveOutlined, ArrowLeftOutlined, ArrowRightOutlined, PlusOutlined, DeleteOutlined, EyeOutlined } from '@ant-design/icons';
import { ModalContext } from '../../shared/context/ModalContext';

import customerService from '../../shared/services/customerService';
import productService from '../../shared/services/productService';
import orderService from '../../shared/services/orderService';

import global from '../../shared/utility/global';
import { v4 as uuidv4 } from 'uuid';

import brand from '../../shared/data/brand.json';
import Loading from '../../shared/components/Loading/Index';

export default function OrderModalForm(props) {
    const modal = useContext(ModalContext);
    const [loading, setLoading] = useState(false);
    const [customers, setCustomers] = useState([]);
    const [products, setProducts] = useState([]);
    const [selectedProduct, setSelectedProduct] = useState();
    const [items, setItems] = useState([]);
    const [form] = Form.useForm();

    useEffect(() => {
        onLoad();
    }, [props.open]);

    const onLoad = async () => {
        if (!props.open)
            return;

        setLoading(true);

        const customers = await customerService.get();
        setCustomers(customers);

        const products = await productService.get();
        setProducts(products);

        setLoading(false);
    };

    const onCancel = () => {
        form.resetFields();
        props.onCancel();
        setSelectedProduct(undefined);
        setItems([]);
    };

    const onSave = async () => {
        var validations = await form.validateFields().then(() => true).catch(() => false);
        if (!validations) {
            message.warning('Por favor completa los datos del formulario.', 7);
            return;
        }

        modal.confirm('¿Esta seguro de realizar la acción?', async () => {
            var orderItems = [];
            items.forEach(element => {
                orderItems.push({
                    productId: form.getFieldValue([element.code, "productId"]),
                    price: form.getFieldValue([element.code, "price"]),
                    quantity: form.getFieldValue([element.code, "quantity"])
                })
            });

            var body = {
                customerId: form.getFieldValue('customerId'),
                orderItems: orderItems
            }

            var response = await orderService.post(body);

            if (response.status === 200) {
                message.success(`Orden registrada correctamente.`, 7);
                onCancel();
                props.onLoad();
            }
            else if (response.status === 400)
                message.warning(<>
                    <div>Sin stock disponible para:</div>
                    <ul>
                        {
                            response.data.map(item => (<li>{item.name}</li>))
                        }
                    </ul>
                </>);
            else
                message.error('Ocurrió un error inesperado, por favor intentelo mas tarde.');
        });
    };

    const onAdd = () => {
        if (!selectedProduct) {
            message.warning("Seleccione un producto.");
            return;
        }

        var code = uuidv4();
        var itemsTemp = items.map(m => ({ ...m }));
        itemsTemp.push({ code, ...selectedProduct });
        setItems(itemsTemp);
    };

    const onRemove = (row) => {
        var itemsTemp = [];
        items.forEach(item => {
            if (item.code !== row.code)
                itemsTemp.push(item);
        });
        setItems(itemsTemp);
    };

    const onCompleteNumber = (item, property, value) => {
        if (value === '' || isNaN(parseFloat(value).toFixed(2)))
            form.setFieldsValue({ [item]: { [property]: '0' } });
        else
            form.setFieldsValue({ [item]: { [property]: parseInt(value) } });
    };

    return (
        <Modal
            title={`${(props.id === 0 ? 'Nueva' : 'Modificar')} Orden`}
            open={props.open}
            destroyOnClose={true}
            className='product-page'
            onCancel={(prop) => {
                if (!prop.target.className.toString().match("ant-modal-wrap") || prop.type === "keydown")
                    onCancel();
            }}
            width={700}
            footer={[
                <Button key="1" onClick={onCancel} shape='round'>
                    <CloseOutlined /> Cancelar
                </Button>,
                <Button key="2" onClick={onSave} type={'primary'} shape='round'>
                    <SaveOutlined /> Guardar
                </Button>
            ]}
        >
            <Loading visible={loading} text="cargando">
                <Form
                    form={form}
                    layout="vertical"
                >
                    <Row gutter={20} className='mt-20'>
                        <Col span={24}>
                            <Form.Item
                                label="Cliente"
                                name="customerId"
                                rules={[{ required: true, message: 'Campo obligatorio.' }]}
                            >
                                <Select
                                    showSearch
                                    optionFilterProp="children"
                                    placeholder="Seleccione"

                                >
                                    {customers.map(item => (
                                        <Select.Option
                                            key={item.id}
                                            value={item.id}
                                        >
                                            {item.name + ' ' + item.lastName}
                                        </Select.Option>
                                    ))}
                                </Select>
                            </Form.Item>
                        </Col>
                        <Col span={24} className='mb-5'>
                            Productos
                        </Col>
                        <Col span={24}>
                            <Space.Compact className='w-100'>
                                <Form.Item
                                    label=""
                                    name="productId"
                                    className='w-100'
                                >
                                    <Select
                                        showSearch
                                        optionFilterProp="children"
                                        placeholder="Seleccione"
                                        onChange={(a, b) => setSelectedProduct(b.data)}
                                    >
                                        {products.map(item => (
                                            <Select.Option
                                                key={item.id}
                                                value={item.id}
                                                data={item}
                                            >
                                                {item.name}
                                            </Select.Option>
                                        ))}
                                    </Select>
                                </Form.Item>
                                <Button type='primary' onClick={() => onAdd()}>
                                    Agregar
                                </Button>
                            </Space.Compact>
                        </Col>

                        <Col span={24} className='mt-10'>
                            {
                                items.map(item => {
                                    return (
                                        <>
                                            <Form.Item
                                                name={[item.code, 'productId']}
                                                style={{ display: 'none' }}
                                                initialValue={item.id}
                                            >
                                                <Input type="text" />
                                            </Form.Item>
                                            <Space.Compact>
                                                <Form.Item
                                                    label={"Producto"}
                                                    name={[item.code, 'name']}
                                                    initialValue={item.name}
                                                    style={{ marginBottom: 0 }}
                                                >
                                                    <Input type="text" readOnly={true} />
                                                </Form.Item>
                                                <Form.Item
                                                    label={"Precio"}
                                                    name={[item.code, 'price']}
                                                    initialValue={item.price}
                                                    style={{ marginBottom: 0 }}
                                                >
                                                    <Input type="text" readOnly={true} />
                                                </Form.Item>
                                                <Form.Item
                                                    label={"Cantidad"}
                                                    name={[item.code, 'quantity']}
                                                    initialValue={item.quantity}
                                                    style={{ marginBottom: 0 }}
                                                    rules={[{ required: true, message: '' }]}
                                                >
                                                    <Input
                                                        type="text"
                                                        onKeyPress={global.onKeyPressNumber}
                                                        onBlur={(e) => onCompleteNumber(item.code, 'quantity', e.target.value)}
                                                        style={{ background: '#fffcd7' }}
                                                    />
                                                </Form.Item>
                                                <Form.Item noStyle shouldUpdate={(a, b) => {
                                                    var propertya = a[item.code];
                                                    var propertyb = b[item.code];
                                                    return propertya?.quantity !== propertyb?.quantity;
                                                }}>
                                                    {(param) => {
                                                        var price = param.getFieldValue([item.code, "price"]);
                                                        var quantity = param.getFieldValue([item.code, "quantity"]) ?? 0;
                                                        param.setFieldValue([item.code, "total"], parseFloat((price * quantity).toFixed(2)))
                                                        return (
                                                            <Form.Item
                                                                label={"Total"}
                                                                name={[item.code, 'total']}
                                                                style={{ marginBottom: 0 }}
                                                            >
                                                                <Input type="text" readOnly={true} />
                                                            </Form.Item>
                                                        );
                                                    }}
                                                </Form.Item>
                                                <Button
                                                    type='text'
                                                    size='large'
                                                    icon={<DeleteOutlined />}
                                                    className="ml-5 mt-20"
                                                    onClick={() => onRemove(item)}
                                                />
                                            </Space.Compact>
                                            <Divider style={{ margin: '10px 0px' }} />
                                        </>
                                    )
                                })
                            }
                        </Col>
                        <Col span={24}>
                            <div style={{ width: 150, float: 'right' }} className='mt-10 mb-10'>
                                <Form.Item noStyle shouldUpdate>
                                    {() => {
                                        var total = 0;
                                        items.forEach(element => {
                                            total = total + form.getFieldValue([element.code, "total"]);
                                        });

                                        return (
                                            <Input addonBefore="Total" type="text" readOnly={true} value={total.toFixed(2)} />
                                        );
                                    }}
                                </Form.Item>
                            </div>
                        </Col>
                    </Row>
                </Form>
            </Loading>
        </Modal>
    );
}