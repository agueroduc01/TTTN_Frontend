import axios from './axios.config';

const apiPrefix = '/api/v1/users/login';

export function login(username: string, password: string) {
  const formData = new FormData();
  formData.append('username', username);
  formData.append('password', password);
  return axios.post(`${apiPrefix}`, formData);
}
