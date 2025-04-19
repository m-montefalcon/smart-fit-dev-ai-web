// src/api/axiosInstance.ts
import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true, // ✅ default to sending cookies
});

const skipCookiesRoutes = ['/auth/register', '/auth/login'];

axiosInstance.interceptors.request.use((config) => {
  if (config.url) {
    const shouldSkip = skipCookiesRoutes.some((route) =>
      config.url?.startsWith(route),
    );

    if (shouldSkip) {
      config.withCredentials = false; // ❌ don’t send cookies for these
    }
  }

  return config;
});

export default axiosInstance;
