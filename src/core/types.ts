export interface GetManyResponse<T> {
  page: number;
  count: number;
  total: number;
  items: T[];
}

export type Sort = 'name' | 'price';

export type Order = 'desc' | 'asc';
