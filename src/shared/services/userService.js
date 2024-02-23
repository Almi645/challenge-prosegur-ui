import axios from 'axios';

class userService {
    async auth(data) {
        const response = await axios
            .post(`${process.env.REACT_APP_URL_API}user/auth`, data)
            .then(response => { 
                return response; 
            })
            .catch(error => {
                console.log(error);
                return error.response ? error.response : {};
            });
        return response;
    };
}

export default new userService();