import { api } from '@/core/api';
import { GetManyResponse } from '@/core/types';

export interface Property {
  id: number;
  name: string;
}

export interface GetPropertiesParams {
  search?: string;
  page?: number;
  count?: number;
}

export interface UpdatePropertyData {
  id: number;
  name: string;
}

export const getProperties = async (params: GetPropertiesParams) => {
  const { data } = await api.get<GetManyResponse<Property>>('/properties', { params });
  return data;
};

export const getAllProperties = async () => {
  const { data } = await api.get<Property[]>('/properties/all');
  return data;
};

export const createProperty = async (name: string) => api.post('/properties', { name });

export const updateProperty = async ({ id, ...data }: UpdatePropertyData) => api.patch(`/properties/${id}`, data);

export const removeProperty = async (id: number) => api.delete(`/properties/${id}`);
