import axios from 'axios';

class productService {
    async get() {
        return await 
            axios
            .get(`${process.env.REACT_APP_URL_API}product`)
            .then(response => response.data)
            .catch(error => {
                throw error;
            })
    };
}

export default new productService();