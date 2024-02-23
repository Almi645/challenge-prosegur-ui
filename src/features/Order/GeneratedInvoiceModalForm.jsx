import React, { useState, useEffect, useContext } from 'react';

import { Modal, Form, Row, Col, Input, Button, Select, ColorPicker, Upload, Space, message, Divider } from 'antd';
import { CloseOutlined, SaveOutlined, ArrowLeftOutlined, ArrowRightOutlined, PlusOutlined, DeleteOutlined, EyeOutlined } from '@ant-design/icons';
import { ModalContext } from '../../shared/context/ModalContext';

import provinceService from '../../shared/services/provinceService';
import invoiceService from '../../shared/services/invoiceService';

import global from '../../shared/utility/global';
import { v4 as uuidv4 } from 'uuid';

import brand from '../../shared/data/brand.json';
import Loading from '../../shared/components/Loading/Index';

export default function GeneratedInvoiceModalForm(props) {
    const modal = useContext(ModalContext);
    const [loading, setLoading] = useState(false);
    const [provinces, setProvinces] = useState([]);
    const [form] = Form.useForm();

    useEffect(() => {
        onLoad();
    }, [props.open]);

    const onLoad = async () => {
        if (!props.open)
            return;

        setLoading(true);

        const provinces = await provinceService.get();
        setProvinces(provinces);

        setLoading(false);
    };

    const onCancel = () => {
        form.resetFields();
        props.onCancel();
    };

    const onSave = async () => {
        var validations = await form.validateFields().then(() => true).catch(() => false);
        if (!validations) {
            message.warning('Por favor completa los datos del formulario.', 7);
            return;
        }

        modal.confirm('¿Esta seguro de realizar la acción?', async () => {
            var body = form.getFieldValue();
            body.orderId = props.orderId;

            var response = await invoiceService.post(body);

            if (response.status === 200) {
                message.success(`Factura generada correctamente.`, 7);
                onCancel();
                props.onLoad();
            }
            else {
                message.error('Ocurrió un error inesperado, por favor intentelo mas tarde.');
            }
        });
    };

    return (
        <Modal
            title={`Generar Factura`}
            open={props.open}
            destroyOnClose={true}
            className='product-page'
            onCancel={(prop) => {
                if (!prop.target.className.toString().match("ant-modal-wrap") || prop.type === "keydown")
                    onCancel();
            }}
            width={600}
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
                        <Col span={12}>
                            <Form.Item
                                label="Serie"
                                name="serie"
                                rules={[{ required: true, message: 'Campo obligatorio.' }]}
                            >
                                <Input
                                    placeholder="Ingrese serie"
                                    autoComplete="off"
                                />
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item
                                label="Documento"
                                name="document"
                                rules={[{ required: true, message: 'Campo obligatorio.' }]}
                            >
                                <Input
                                    placeholder="Ingrese documento"
                                    autoComplete="off"
                                />
                            </Form.Item>
                        </Col>
                        <Col span={24}>
                            <Form.Item
                                label="Provincia"
                                name="provinceId"
                                className='w-100'
                            >
                                <Select
                                    showSearch
                                    optionFilterProp="children"
                                    placeholder="Seleccione"
                                >
                                    {provinces.map(item => (
                                        <Select.Option
                                            key={item.id}
                                            value={item.id}
                                        >
                                            {item.name}
                                        </Select.Option>
                                    ))}
                                </Select>
                            </Form.Item>
                        </Col>
                    </Row>
                </Form>
            </Loading>
        </Modal>
    );
}