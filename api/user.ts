import axios from './axios.config';

const prefix = 'api/v1/users';

export function getUsers() {
  return axios.get(`${prefix}`);
}

export function getManagerList() {
  return axios.get(`${prefix}/managerList`);
}
