import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import interceptor from '../../interceptor';

import AuthenticationProtected from './AuthenticationProtected';

import Layout from '../Layout/Index';
import Login from '../Login/Index';
import Home from '../../../features/Home/Index';
import Order from '../../../features/Order/Index';
import Invoice from '../../../features/Invoice/Index';

export default function Index() {

    interceptor.init();

    return (
        <BrowserRouter>
            <Routes>
                <Route exact path="/login" element={<Login />} />
                <Route exact path="/" element={<Layout />}>
                    <Route exact path="/" element={<Home />} />
                    <Route exact path="/home" element={<Home />} />
                    <Route exact element={<AuthenticationProtected />}>
                        <Route path="/order" element={<Order />} />
                        <Route path="/invoice" element={<Invoice />} />
                    </Route>
                </Route>
            </Routes>
        </BrowserRouter>
    );
}