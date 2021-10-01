import axios from 'axios';
import host from './host';

const appAxios = axios.create({
  baseURL: host.url,
  timeout: 5000,
});

appAxios.interceptors.request.use(
  config => {
    return config;
  },
  error => {
    // console.log(error);
    return Promise.reject(error);
  },
);

appAxios.interceptors.response.use(
  config => {
    return config;
  },
  error => {
    // console.log(error);
    return Promise.reject(error);
  },
);

export default appAxios;
