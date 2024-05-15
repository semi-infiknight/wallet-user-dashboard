import axios from 'axios';
import { BASE_URL } from '../../utils/constant';
import { getFromLocalStorage } from '../../utils/helper';

const axiosClient = axios.create({ baseURL: BASE_URL });

let address = '';
// const userAddress = sessionStorage.getItem('userAddress');
const userAddress = getFromLocalStorage('userAddress');
console.log('User address is here', userAddress);

axiosClient.interceptors.request.use(async (request) => {
  if (userAddress) {
    address = userAddress as string;
  }
  request.headers.address = address.toLowerCase();
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
