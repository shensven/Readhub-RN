import axios from 'axios';

const appAxios = axios.create({
  baseURL: 'https://api.readhub.cn/',
  timeout: 5000,
});

appAxios.interceptors.request.use(
  config => config,
  error => {
    Promise.reject(error);
  },
);

appAxios.interceptors.response.use(
  config => config,
  error => {
    Promise.reject(error);
  },
);

export default appAxios;
