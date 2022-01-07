import axios from 'axios';

function api() {
  axios.defaults.withCredentials = true;
  axios.defaults.crossdomain = true;
  return axios.create({
    baseURL: 'http://34.159.107.187/api',
  });
}

export default {api};
