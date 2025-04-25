// import axios from 'axios';

// const MAIN_URL = "http://localhost:3000";

// const axiosInstance = axios.create({
//     baseURL: MAIN_URL,
// });

// axiosInstance.interceptors.request.use(
//     (config) => {
//         return config;
//     },
//     (error) => {
//         return Promise.reject(error);
//     }
// );

// export default axiosInstance;


import axios from 'axios';
import Cookies from "js-cookie";
import { MAIN_URL } from '../constants/Endpoints';

const getToken = () => {
  return  Cookies.get("token");
};

const axiosInstance = axios.create({
  baseURL: MAIN_URL,
});

axiosInstance.interceptors.request.use(
  (config) => {
    const token = getToken();
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;

    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default axiosInstance;
