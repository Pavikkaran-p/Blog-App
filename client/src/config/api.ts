import axios, { AxiosError, InternalAxiosRequestConfig } from 'axios';
import { BackendUrl } from './AppConfig';

const api = axios.create({
  baseURL: BackendUrl,
  withCredentials: true,
});

api.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const token = localStorage.getItem('authToken');
    if (token && config.headers) {
      console.log("Authorization",config.headers)
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error: AxiosError) => Promise.reject(error)
);

api.interceptors.response.use(
  (response) => response,
  (error: AxiosError) => {
    if (error.response?.status === 401) {
    //   window.location.href = '/login';
    console.log(error)
    }
    return Promise.reject(error);
  }
);

export default api;
