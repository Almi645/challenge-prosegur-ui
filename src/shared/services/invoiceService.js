import axios from 'axios';

class invoiceService {
    async get() {
        return await
            axios
                .get(`${process.env.REACT_APP_URL_API}invoice`)
                .then(response => response.data)
                .catch(error => {
                    throw error;
                })
    };

    async post(body) {
        const response = await axios
            .post(`${process.env.REACT_APP_URL_API}invoice`, body)
            .then(response => {
                return response;
            })
            .catch(error => {
                console.error(error);
                return error.response ? error.response : error;
            });
        return response;
    };
}

export default new invoiceService();