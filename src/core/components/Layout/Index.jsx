import React, { useState, useEffect } from 'react';
import { Outlet, Navigate } from 'react-router-dom';
import { Layout, Menu } from 'antd';
import { ModalContext } from '../../../shared/context/ModalContext';
import { modalReducer } from './modalReducer';
import session from '../../../shared/utility/session';

import LayoutHeader from './LayoutHeader';
import LayoutMenu from './LayoutMenu';
import LayoutModal from './LayoutModal';

const { Header, Content, Sider } = Layout;

export default function Index(props) {
    const [, setUpdate] = useState(false);
    const [modalState, modalDispatch] = React.useReducer(modalReducer, modalReducer());

    const modalContextConfig = {
        confirm: (message, onOk, onCancel, okText, cancelText) => modalDispatch({ type: 'CONFIRM', message, onOk, onCancel, okText, cancelText }),
        success: (message, onOk = null) => modalDispatch({ type: 'SUCCESS', message, onOk }),
        warning: (message, onOk = null) => modalDispatch({ type: 'WARNING', message, onOk }),
        info: (message, onOk = null) => modalDispatch({ type: 'INFO', message, onOk }),
        error: (message, onOk = null) => modalDispatch({ type: 'ERROR', message, onOk })
    };

    useEffect(() => {

    }, []);

    const onSignOut = () => {
        localStorage.clear();
        setUpdate(true);
    };

    if (!session.isAuthenticated())
        return <Navigate to='/login' />

    return (
        <ModalContext.Provider value={modalContextConfig}>
            <Layout className="layout" id="component-layout">
                <LayoutHeader onSignOut={onSignOut}/>
                <LayoutMenu menus={session.user()?.menus}/>
                <Content style={{ padding: '0 60px' }}>
                    <div className="site-layout-content">
                        <Outlet />
                    </div>
                    <LayoutModal
                        state={modalState}
                        dispatch={modalDispatch}
                    />
                </Content>
            </Layout>
        </ModalContext.Provider>
    );
}