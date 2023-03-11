import { useQuery } from 'react-query';
import { getAllProperties, getProperties, GetPropertiesParams } from '@/services/properties';

export const useGetProperties = (params: GetPropertiesParams) => useQuery(['properties', params], () => getProperties(params));

export const useGetAllProperties = () => useQuery(['properties', 'all'], getAllProperties);
