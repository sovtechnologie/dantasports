import axios from 'axios';

const api = axios.create({
  baseURL: 'https://api.dantasport.com', // replace with real API
  withCredentials: true,
});

export default api;
