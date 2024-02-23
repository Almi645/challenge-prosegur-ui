import React from 'react';
import { Modal, Row, Button } from 'antd';

export default function LayoutModal(props) {

    const onOk = async () => {
        return new Promise(async (resolve, reject) => {
            props.dispatch({ type: 'LOADING', loading: true });
            try { await props.state.onOk(); reject(); } catch (error) { }
            props.dispatch({ type: 'OPEN', open: false });
        }).catch(() => {
            props.dispatch({ type: 'CANCEL' });
        });
    };

    const onCancel = async () => {
        if ([null, undefined].includes(props.state.onCancel))
            await props.state.onCancel();

        props.dispatch({ type: 'CANCEL' });
    };

    return (
        <Modal
            title={
                <div>
                    <span><img src={props.state.icon} className='header-icon' alt='img' /></span>&nbsp;&nbsp;{props.state.title}
                </div>
            }
            closable={false}
            open={props.state.open}
            destroyOnClose={true}
            className='custom-ant-modal'
            width={420}
            onCancel={() => { }}
            footer={[
                <Button
                    key='1'
                    loading={props.state.loadingCancel}
                    onClick={props.state.loadingCancel ? () => { } : onCancel}
                    style={{ display: props.state.onCancel !== null ? '' : 'none' }}
                >
                    {
                        [null, undefined].includes(props.state.cancelText) ? 'Cancelar' : props.state.cancelText
                    }
                </Button>
                ,
                <Button
                    key='2'
                    type='primary'
                    loading={props.state.loading}
                    onClick={props.state.loading ? () => { } : onOk}
                >
                    {
                        [null, undefined].includes(props.state.okText) ? 'Aceptar' : props.state.okText
                    }
                </Button>
            ]}
        >
            <Row>
                {props.state.message}
            </Row>
        </Modal>
    );
}