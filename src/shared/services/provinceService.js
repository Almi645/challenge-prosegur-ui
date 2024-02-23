import axios from 'axios';

class provinceService {
    async get() {
        return await 
            axios
            .get(`${process.env.REACT_APP_URL_API}province`)
            .then(response => response.data)
            .catch(error => {
                throw error;
            })
    };
}

export default new provinceService();