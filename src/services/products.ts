import { api } from '@/core/api';
import { GetManyResponse, Order, Sort } from '@/core/types';
import { CategoryWithChildren } from './categories';

export interface Product {
  id: number;
  name: string;
  slug: string;
  price: number;
  description: string | null;
  image: string | null;
  inStock: boolean;
}

export interface Property {
  id: number;
  value: string;
  property: {
    id: number;
    name: string;
  };
}

export interface ProductWithRelations extends Product {
  properties: Property[];
  category: CategoryWithChildren;
}

export interface GetProductsParams {
  search?: string;
  page?: number;
  count?: number;
  ids?: string;
  sort?: Sort;
  order?: Order;
  categoryId?: number;
  minPrice?: number;
  maxPrice?: number;
  inStock?: boolean;
  withImage?: boolean;
}

export interface UpdateProductData extends Omit<Product, 'image'> {
  categoryId: number;
}

export interface CreateProductPropertyData {
  productId: number;
  propertyId: number;
  value: string;
}

export interface UpdateProductPropertyData {
  id: number;
  value: string;
}

export interface UpdateProductImageData {
  id: number;
  image: File;
}

export const getProducts = async (params: GetProductsParams) => {
  const { data } = await api.get<GetManyResponse<Product>>('/products', { params });
  return data;
};

export const getProduct = async (slug: string) => {
  const { data } = await api.get<ProductWithRelations>(`/products/${slug}`);
  return data;
};

export const createProduct = async (data: FormData) => api.post('/products', data);

export const updateProduct = async ({ id, ...product }: Partial<Product>) => {
  const { data } = await api.patch<Product>(`/products/${id}`, product);
  return data;
};

export const updateProductImage = async (product: UpdateProductImageData) => {
  const formData = new FormData();
  formData.set('image', product.image);
  const { data } = await api.patch<Product>(`/products/${product.id}/image`, formData);
  return data;
};

export const removeProduct = async (id: number) => api.delete(`/products/${id}`);

export const removeProductImage = async (id: number) => api.delete(`/products/${id}/image`);

export const createProductProperty = async ({
  productId,
  propertyId,
  ...data
}: CreateProductPropertyData) => (
  api.post(`/products/${productId}/properties/${propertyId}`, data)
);

export const updateProductProperty = async ({ id, ...data }: UpdateProductPropertyData) => (
  api.patch(`/products/properties/${id}`, data)
);

export const removeProductProperty = async (id: number) => api.delete(`/products/properties/${id}`);
