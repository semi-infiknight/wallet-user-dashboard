import axios from 'axios';
import { BASE_URL } from '../../utils/constant';

const axiosClient = axios.create({ baseURL:BASE_URL  });

let address = '';

axiosClient.interceptors.request.use(async request => {
    if (!address.length) {
        address = '0x2723A2756ecb99b3B50f239782876fB595728AC0';
        // address = session?.authorization?.address || '';
    }

    request.headers.address = address;

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