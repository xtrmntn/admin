import { api } from '@/core/api';

export const getMe = async () => api.get('/users/me');
