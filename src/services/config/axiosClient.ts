import axios from 'axios';
import { BASE_URL } from '../../utils/constant';

const axiosClient = axios.create({ baseURL:BASE_URL  });

let token = '';

axiosClient.interceptors.request.use(async request => {
    if (!token.length) {
        token = 'this-is-static-token, update axios client';
        // token = session?.authorization?.token || '';
    }

    request.headers.token = token;

    return request;
});

axiosClient.interceptors.response.use(
    response => {
        // Response with 2xx status code lies here
        return response.data;
    },
    error => {
        // Error handling goes here...
        return Promise.reject(error.response.data);
    }
);

export default axiosClient;