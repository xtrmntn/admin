/* eslint-disable no-underscore-dangle */
/* eslint-disable no-param-reassign */

import axios from 'axios';
import { refresh } from '@/services/auth';
import { storage } from '@/utils/storage';

export const api = axios.create({ baseURL: import.meta.env.VITE_API_URL });

api.interceptors.request.use((config) => {
  config.headers.Authorization = `Bearer ${storage.get('accessToken')}`;
  return config;
});

api.interceptors.response.use(
  (config) => config,
  async (error) => {
    const originalRequest = error.config;
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        const refreshToken = storage.get('refreshToken');
        if (!refreshToken) throw error;

        const { accessToken } = await refresh(refreshToken);
        storage.set('accessToken', accessToken);

        return await api.request(originalRequest);
      } catch (e) {
        storage.remove('accessToken');
        storage.remove('refreshToken');
        return Promise.reject(e);
      }
    }
    return Promise.reject(error);
  },
);
