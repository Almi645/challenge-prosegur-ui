
import axios from 'axios';

class interceptor {
    init() {
        axios.interceptors.request.use(async config => {
            return config;
        }, function (error) {
            return Promise.reject(error);
        });

        axios.interceptors.response.use(async response => {
            return response;
        }, function (error) {
            return Promise.reject(error);
        });
    }
}

export default new interceptor();