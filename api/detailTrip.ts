import axios from './axios.config';

const prefix = 'api/v1/trips';

export const getTrip = (id: number) => {
  return axios.get(`${prefix}/${id}`);
};
