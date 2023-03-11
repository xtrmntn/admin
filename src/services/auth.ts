import axios from 'axios';
import { api } from '@/core/api';
import { storage } from '@/utils/storage';

export interface AuthCredentials {
  login: string;
  password: string;
}

export const login = async (credentials: AuthCredentials) => {
  const { data } = await axios.post<{
    accessToken: string;
    refreshToken: string;
  }>(`${import.meta.env.VITE_API_URL}/auth/login`, credentials);
  return data;
};

export const logout = async () => api.post('/auth/logout');

export const refresh = async (token: string) => {
  const { data } = await axios.post<{ accessToken: string }>(
    `${import.meta.env.VITE_API_URL}/auth/refresh`,
    { token },
    {
      headers: {
        Authorization: `Bearer ${storage.get('accessToken')}`,
      },
    },
  );
  return data;
};
