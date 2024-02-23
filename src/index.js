import React from 'react';
import ReactDOM from 'react-dom/client';
import logo from './logo.svg';

import Routers from './core/components/Routers/Index';

import './index.css';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Routers />
  </React.StrictMode>
);