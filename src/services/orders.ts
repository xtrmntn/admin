import { api } from '@/core/api';
import { GetManyResponse } from '@/core/types';
import { Product } from './products';

export type OrderStatus = 'created' | 'processing' | 'send' | 'finished';

export type PaymentStatus = 'pending' | 'waiting_for_capture' | 'succeeded' | 'canceled';

export type ReceiptStatus = 'pending' | 'succeeded' | 'canceled';

export interface Order {
  id: number;
  number: string;
  fullName: string;
  phone: string;
  email: string;
  address: string;
  comment: string | null;
  status: OrderStatus;
  transportCompany: string | null;
  trackNumber: string | null;
}

export interface OrderItem {
  id: number;
  price: number;
  quantity: number;
  product: Product;
}

interface PaymentAmount {
  value: string;
  currency: string;
}

export interface Payment {
  id: string;
  status: PaymentStatus;
  amount: PaymentAmount;
  income_amount?: PaymentAmount;
  refunded_amount?: PaymentAmount;
  created_at: string;
  captured_at?: string;
  expires_at?: string;
  paid: boolean;
  refundable: boolean;
  confirmation?: {
    type: 'redirect';
    confirmation_url: string;
  };
  receipt_registration?: ReceiptStatus;
}

export interface GetOrdersParams {
  search?: string;
  page?: number;
  count?: number;
}

export interface GetOrderResponse {
  order: Order & { items: OrderItem[] };
  payment: Payment;
}

export type UpdateOrderData = Pick<Order, 'id' | 'status' | 'address' | 'transportCompany' | 'trackNumber'>;

export const getOrders = async (params: GetOrdersParams) => {
  const { data } = await api.get<GetManyResponse<Order>>('/orders', { params });
  return data;
};

export const getOrder = async (id: number) => {
  const { data } = await api.get<GetOrderResponse>(`/orders/${id}`);
  return data;
};

export const updateOrder = ({ id, ...order }: UpdateOrderData) => api.patch(`/orders/${id}`, order);
