import axios, {AxiosInstance} from 'axios';

const feedAxios: AxiosInstance = axios.create({
  baseURL: 'https://api.readhub.cn/',
  timeout: 5000,
});

export default feedAxios;
