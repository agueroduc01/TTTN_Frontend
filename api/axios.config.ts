import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://localhost:8080',
});

instance.defaults.headers.post['Content-Type'] = 'application/json';
instance.defaults.headers.put['Content-Type'] = 'application/json';

instance.interceptors.request.use((config) => {
  config.headers.Authorization = 'Bearer ' + localStorage.getItem('token');
  return config;
});

export default instance;
