import React from 'react';
import { Spin } from 'antd';
import './styles.css';

export default function Index(props) {
    return (
        <div id="shared-component-loading" style={{ width: '100%', height: props.height === undefined ? 'auto' : props.height }}>
            <Spin
                {
                    ...(props.text !== undefined ? ({ tip: props.text }) : ({}))
                }
                size="large"
                id="shared-component-loading"
                spinning={props.visible === undefined ? false : props.visible}
            >
                {props.children}
            </Spin>
        </div>
    );
}