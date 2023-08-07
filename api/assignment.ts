import axios from './axios.config';

const prefix = 'api/v1/assignments';

export const getAssignments = () => {
  return axios.get(`${prefix}`);
};

export const updateAssignments = () => {};
