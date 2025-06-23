import axios from 'axios';
import Cookies from 'js-cookie';;

const api = axios.create({
  baseURL: 'http://65.0.170.18:3000/api/v1', // replace with real API
  // withCredentials: true,
});

export default api;

api.interceptors.request.use(
  (config) => {
    // Add any request interceptors here, e.g., adding auth tokens
    const token = Cookies.get('token');;
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  (response) => {
    // Handle successful responses
    return response;
  },
  (error) => {
    // Handle errors globally
    if (error.response && error.response.status === 401) {
      // Handle unauthorized access, e.g., redirect to login
      console.error('Unauthorized access - redirecting to login');
      // You can add logic to redirect to login page here
      // For example, you might use a router to navigate to the login page
      Cookies.remove('token'); // Remove token from cookies
      // Optionally, you can redirect to the login page
      
      // window.location.href = '/login';

    }
    return Promise.reject(error);
  }
);