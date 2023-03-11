import { useQuery } from 'react-query';
import { getProduct, getProducts, GetProductsParams } from '@/services/products';

export const useGetProduct = (slug: string) => useQuery(['product', slug], () => getProduct(slug));

export const useGetProducts = (params: GetProductsParams) => useQuery(['products', params], () => getProducts(params));
