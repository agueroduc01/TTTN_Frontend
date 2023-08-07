import axios from './axios.config';

const prefix = 'api/v1/trips';

export function getAllAssignmentsInTrip(tripId: number) {
  return axios.get(`${prefix}/${tripId}/assignments`);
}

export const getTrips = () => {
  return axios.get(`${prefix}`);
};

export const detailTrip = (id: number) => {
  return axios.get(`${prefix}/${id}`);
};

export const updateTrip = (id: number) => {
  return axios.put(`${prefix}/${id}`);
};
