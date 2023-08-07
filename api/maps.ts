'use server';
import axios from 'axios';

const state = 'Ha Noi';
const locality = '';
const address = 'Hoang Dieu';
const key = 'Ao6PyCyfS90KFN65nitL8Iq3guJdDOenYEeTH3iv7e-k-i4O_VPcD0alUtobcZzG';
const maxResults = 10;

const mapURL = `http://dev.virtualearth.net/REST/v1/Locations?maxResults=${maxResults}&key${key}=&countryRegion=VN&adminDistrict=${state}&addressLine=${address}&o=json`;

export const handleGetMap = async () => {
  try {
    const data = await axios.get(mapURL);
    console.log(data);
    return data;
  } catch (error) {
    throw Error();
  }
};
