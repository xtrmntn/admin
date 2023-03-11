export const formatPrice = (price: number) => (
  price.toLocaleString('ru', {
    style: 'currency',
    currency: 'RUB',
    maximumFractionDigits: 2,
  })
);

export const formatBoolean = (value: boolean) => (value ? 'Да' : 'Нет');
