import React from 'react';
export const ModalContext = React.createContext({
    confirm: (message, onOk = null, onCancel = null, okText = null, cancelText = null) => {},
    success: (message, onOk = null) => {},
    warning: (message, onOk = null) => {},
    info: (message, onOk = null) => {},
    error: (message, onOk = null) => {},
});

export const ThemeProvider = ModalContext.Provider;
export const ThemeConsumer = ModalContext.Consumer;