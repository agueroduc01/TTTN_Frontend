import axios from './axios.config';

const prefix = 'api/v1/partners';

export const detailPartner = (id: number) => {
  return axios.get(`${prefix}/${id}`);
};
