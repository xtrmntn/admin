import { useQuery } from 'react-query';
import { GetOrdersParams, getOrder, getOrders } from '@/services/orders';

export const useGetOrder = (id: number) => useQuery(['order', id], () => getOrder(id));

export const useGetOrders = (params: GetOrdersParams) => useQuery(['orders', params], () => getOrders(params));
