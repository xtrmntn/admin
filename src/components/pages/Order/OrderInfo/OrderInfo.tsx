import { FC } from 'react';
import {
  Divider, Stack, Text, Link as ChakraLink,
} from '@chakra-ui/react';
import { GetOrderResponse } from '@/services/orders';
import { statuses } from '@/core/data';
import Link from '@/components/common/Link';
import { formatBoolean, formatPhoneNumber, formatPrice } from '@/utils/format';

const OrderInfo: FC<GetOrderResponse> = ({ order, payment }) => {
  const delivery = [order.transportCompany, order.trackNumber].filter(Boolean).join(' / ');

  return (
    <Stack divider={<Divider />}>
      <Stack>
        <Text as="b">Номер заказа:</Text>
        <ChakraLink
          href={`${import.meta.env.VITE_CLIENT_URL}/orders/${order.number}`}
          target="_blank"
        >
          {order.number}
        </ChakraLink>
      </Stack>

      <Stack>
        <Text as="b">ФИО:</Text>
        <Text>{order.fullName}</Text>
      </Stack>

      <Stack>
        <Text as="b">Номер телефона:</Text>
        <ChakraLink href={formatPhoneNumber(order.phone)}>{order.phone}</ChakraLink>
      </Stack>

      <Stack>
        <Text as="b">Email:</Text>
        <ChakraLink href={`mailto:${order.email}`}>{order.email}</ChakraLink>
      </Stack>

      <Stack>
        <Text as="b">Адрес:</Text>
        <Text>{order.address}</Text>
      </Stack>

      {order.comment && (
        <Stack>
          <Text as="b">Комментарий:</Text>
          <Text>{order.comment}</Text>
        </Stack>
      )}

      <Stack>
        <Text as="b">Статус:</Text>
        <Text>
          {statuses.order[order.status]}
          {' / '}
          {statuses.payment[payment.status]}
        </Text>
      </Stack>

      {delivery && (
        <Stack>
          <Text as="b">Доставка:</Text>
          <Text>{delivery}</Text>
        </Stack>
      )}

      <Stack>
        <Text as="b">Товары:</Text>
        {order.items.map((item) => (
          <Text key={item.id}>
            <Link to={`/products/${item.product.slug}`}>{item.product.name}</Link>
            {' '}
            {item.quantity}
            {' шт. x '}
            {formatPrice(item.price)}
          </Text>
        ))}
      </Stack>

      <Stack>
        <Text as="b">Итого:</Text>
        <Text>{formatPrice(Number(payment.amount.value))}</Text>
        {payment.income_amount && (
          <Text>
            {formatPrice(Number(payment.income_amount.value))}
            {' '}
            с учетом комиссии платежной системы
          </Text>
        )}
      </Stack>

      <Stack>
        <Text as="b">Дата создания заказа:</Text>
        <Text>{new Date(payment.created_at).toLocaleString()}</Text>
      </Stack>

      {payment.captured_at && (
        <Stack>
          <Text as="b">Дата подтверждения платежа:</Text>
          <Text>{new Date(payment.captured_at).toLocaleString()}</Text>
        </Stack>
      )}

      <Stack>
        <Text as="b">Оплачен:</Text>
        <Text>{formatBoolean(payment.paid)}</Text>
      </Stack>

      <Stack>
        <Text as="b">Возможность провести возврат:</Text>
        <Text>{formatBoolean(payment.refundable)}</Text>
      </Stack>

      {payment.confirmation && (
        <Stack>
          <Text as="b">Ссылка для оплаты:</Text>
          <ChakraLink
            href={payment.confirmation.confirmation_url}
            target="_blank"
            rel="noreferrer"
          >
            {payment.confirmation.confirmation_url}
          </ChakraLink>
        </Stack>
      )}

      {Number(payment.refunded_amount?.value) && (
        <Stack>
          <Text as="b">Сумма, вернувшаяся покупателю:</Text>
          <Text>{formatPrice(Number(payment.refunded_amount?.value))}</Text>
        </Stack>
      )}

      {payment.receipt_registration && (
        <Stack>
          <Text as="b">Статус регистрации чека:</Text>
          <Text>{statuses.receipt[payment.receipt_registration]}</Text>
        </Stack>
      )}
    </Stack>
  );
};

export default OrderInfo;
