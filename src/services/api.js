import axios from "axios";
import Cookies from "js-cookie";
import { handleLogout } from "../utils/authUtils";
import { store } from "../redux/store.js";

const api = axios.create({
  baseURL: "https://qpcfbzrk62.execute-api.eu-north-1.amazonaws.com/api/v1/", // replace with real API
  // withCredentials: true,
});

export default api;

api.interceptors.request.use(
  (config) => {
    // Add any request interceptors here, e.g., adding auth tokens
    const token = Cookies.get("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

let isLoggingOut = false;

api.interceptors.response.use(
  (response) => response,
  (error) => {
    const isUnauthorized =
      error.response?.status === 401 &&
      error.response?.data?.message === "Unauthorized";

    if (isUnauthorized && !isLoggingOut) {
      isLoggingOut = true;
      console.warn("Unauthorized access - logging out user");
      handleLogout(store.dispatch); // Clear token and redirect
    }

    return Promise.reject(error);
  }
);
