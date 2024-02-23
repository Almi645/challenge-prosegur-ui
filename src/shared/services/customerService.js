import axios from 'axios';

class customerService {
    async get() {
        return await 
            axios
            .get(`${process.env.REACT_APP_URL_API}customer`)
            .then(response => response.data)
            .catch(error => {
                throw error;
            })
    };
}

export default new customerService();