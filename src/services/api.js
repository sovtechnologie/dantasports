import axios from 'axios';

const api = axios.create({
  baseURL: 'http://65.0.170.18:3000/api/v1', // replace with real API
  // withCredentials: true,
});

export default api;
