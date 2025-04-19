// src/api/axiosInstance.ts
import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
});

const skipCookiesRoutes = ['/auth/register', '/auth/login'];

axiosInstance.interceptors.request.use((config) => {
  if (config.url) {
    const shouldSkip = skipCookiesRoutes.some((route) =>
      config.url?.startsWith(route),
    );

    if (shouldSkip) {
      config.withCredentials = false;
    }
  }

  return config;
});

axiosInstance.interceptors.response.use(
  (response) => {
    console.log('Response success:', response.config.url);
    return response;
  },
  (error) => {
    console.error('Response error:', error.config?.url, error.message);
    return Promise.reject(error);
  }
);

export default axiosInstance;
