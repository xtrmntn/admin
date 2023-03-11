import { api } from '@/core/api';

export interface Category {
  id: number;
  name: string;
  slug: string;
  image: string | null;
}

export interface CategoryWithParent extends Category {
  parent?: CategoryWithParent;
}

export interface CategoryWithChildren extends CategoryWithParent {
  children: Category[];
}

export interface UpdateCategoryData {
  id: number;
  name?: string;
  parentId?: number | null;
}

export interface UpdateCategoryImageData {
  id: number;
  image: File;
}

export const getCategories = async () => {
  const { data } = await api.get<Category[]>('/categories');
  return data;
};

export const getAllCategories = async () => {
  const { data } = await api.get<Category[]>('/categories/all');
  return data;
};

export const getCategory = async (slug: string) => {
  const { data } = await api.get<CategoryWithChildren>(`/categories/${slug}`);
  return data;
};

export const createCategory = async (category: FormData) => {
  const { data } = await api.post<CategoryWithParent>('/categories', category);
  return data;
};

export const updateCategory = async ({ id, ...category }: UpdateCategoryData) => {
  const { data } = await api.patch<CategoryWithParent>(`/categories/${id}`, category);
  return data;
};

export const updateCategoryImage = async (category: UpdateCategoryImageData) => {
  const formData = new FormData();
  formData.set('image', category.image);
  const { data } = await api.patch<Category>(`/categories/${category.id}/image`, formData);
  return data;
};

export const removeCategory = async (id: number) => api.delete(`/categories/${id}`);

export const removeCategoryImage = async (id: number) => api.delete(`/categories/${id}/image`);
