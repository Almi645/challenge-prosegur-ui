import React from 'react';
import { Outlet, Navigate } from 'react-router-dom';

export default function AuthenticationProtected(props) {
    var session = localStorage.getItem('session');

    if (session === null)
        return <Navigate to="/login" />;

    return <Outlet/>;
}