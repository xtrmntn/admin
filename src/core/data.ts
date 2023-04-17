import { OrderStatus, PaymentStatus, ReceiptStatus } from '@/services/orders';

export const statuses: {
  order: Record<OrderStatus, string>;
  payment: Record<PaymentStatus, string>;
  receipt: Record<ReceiptStatus, string>;
} = {
  order: {
    created: 'Создан',
    processing: 'В обработке',
    send: 'Отправлен',
    finished: 'Завершен',
  },
  payment: {
    pending: 'Ожидает оплаты',
    waiting_for_capture: 'Ожидает подтверждения',
    succeeded: 'Оплачен',
    canceled: 'Отменен',
  },
  receipt: {
    pending: 'Данные в обработке',
    succeeded: 'Чек успешно зарегистрирован',
    canceled: 'Чек зарегистрировать не удалось, сформируйте чек вручную',
  },
};
