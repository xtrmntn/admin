import { useQuery } from 'react-query';
import { getAllCategories, getCategories, getCategory } from '@/services/categories';

export const useGetCategory = (slug: string) => useQuery(['category', slug], () => getCategory(slug));

export const useGetCategories = () => useQuery('categories', getCategories);

export const useGetAllCategories = () => useQuery(['categories', 'all'], getAllCategories);
