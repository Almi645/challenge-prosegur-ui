import confirm from '../../../assets/icons/modal/question-circle.svg';
import success from '../../../assets/icons/modal/check-circle.svg';
import warning from '../../../assets/icons/modal/exclamation-circle.svg';
import info from '../../../assets/icons/modal/info-circle.svg';
import error from '../../../assets/icons/modal/close-circle.svg';

const initialState = {
    open: false,
    loading: false,
    loadingCancel: false,
    icon: confirm,
    title: 'Confirmación',
    message: '',
    okText: 'Ok',
    cancelText: 'Cancelar',
    onOk: () => { },
    onCancel: () => { }
};

export const modalReducer = (state = initialState, action = {}) => {
    switch (action.type) {
        case 'CONFIRM':
            return {
                ...state,
                open: true,
                icon: confirm,
                title: 'Confirmación',
                message: action.message ?? '',
                okText: action.okText ?? 'Ok',
                cancelText: action.cancelText ?? 'Cancelar',
                onOk: action.onOk ?? (() => { }),
                onCancel: action.onCancel ?? (() => { })
            };
        case 'SUCCESS':
            return {
                ...state,
                open: true,
                icon: success,
                title: 'Mensaje',
                message: action.message ?? '',
                onOk: action.onOk ?? (() => { }),
                onCancel: action.onCancel ?? null
            };
        case 'WARNING':
            return {
                ...state,
                open: true,
                icon: warning,
                title: 'Mensaje',
                message: action.message ?? '',
                onOk: action.onOk ?? (() => { }),
                onCancel: action.onCancel ?? null
            };
        case 'INFO':
            return {
                ...state,
                open: true,
                icon: info,
                title: 'Mensaje',
                message: action.message ?? '',
                onOk: action.onOk ?? (() => { }),
                onCancel: action.onCancel ?? null
            };
        case 'ERROR':
            return {
                ...state,
                open: true,
                icon: error,
                title: 'Mensaje',
                message: action.message ?? '',
                onOk: action.onOk ?? (() => { }),
                onCancel: action.onCancel ?? null
            };
        case 'OPEN':
            return { ...state, open: action.open };
        case 'LOADING':
            return { ...state, loading: action.loading };
        case 'CANCEL':
            return { ...state, open: false, loading: false };
        default:
            return state;
    }
}