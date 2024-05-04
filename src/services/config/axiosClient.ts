import axios from 'axios';
import { BASE_URL } from '../../utils/constant';
import { getFromLocalStorage } from '../../utils/helper';

const axiosClient = axios.create({ baseURL: BASE_URL });

const userAddress: string = getFromLocalStorage('userAddress') || '';
let address = '';

axiosClient.interceptors.request.use(async (request) => {
  if (userAddress) {
    // Use the address from _userDetails if available
    address = userAddress;
  }
  request.headers.address = address;
  return request;
});

axiosClient.interceptors.response.use(
  (response) => {
    // Response with 2xx status code lies here
    return response.data;
  },
  (error) => {
    // Error handling goes here...
    return Promise.reject(error.response.data);
  },
);

export default axiosClient;
