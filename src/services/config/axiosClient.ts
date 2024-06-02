import axios from 'axios';
import { BASE_URL } from '../../utils/constant';
import { getFromLocalStorage, removeFromLocalStorage } from '../../utils/helper';

const axiosClient = axios.create({ baseURL: BASE_URL });

axiosClient.interceptors.request.use(async (request) => {
  const userAddress: string = getFromLocalStorage('userAddress') as string;
  console.log('User address is here 2', userAddress);
  if (!userAddress) {
    throw new Error('User not set');
  }
  request.headers.address = userAddress.toLowerCase();
  return request;
});

axiosClient.interceptors.response.use(
  (response) => {
    // Response with 2xx status code lies here
    return response.data;
  },
  (error) => {
    removeFromLocalStorage('userAddress');
    removeFromLocalStorage('authenticated');
    // Error handling goes here...
    return Promise.reject(error.response.data);
  },
);

export default axiosClient;
