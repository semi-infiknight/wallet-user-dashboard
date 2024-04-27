import axios from 'axios';
import { BASE_URL } from '../../utils/constant';
import { UserDetailsType } from '../../utils/Types';

const axiosClient = axios.create({ baseURL: BASE_URL });

let userDetails: UserDetailsType;

// Fetch _userDetails from session storage
const userDetailsJSON = window.sessionStorage.getItem('userDetails');
if (userDetailsJSON) {
  userDetails = JSON.parse(userDetailsJSON);
}

let address = '';
axiosClient.interceptors.request.use(async (request) => {
  if (!address.length) {
    // Use the address from _userDetails if available
    address = userDetails?.address || '';
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
