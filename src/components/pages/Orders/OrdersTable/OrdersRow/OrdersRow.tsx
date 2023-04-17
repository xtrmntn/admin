import { FC } from 'react';
import { useNavigate } from 'react-router-dom';
import { Td, Tr } from '@chakra-ui/react';
import { Order } from '@/services/orders';
import { statuses } from '@/core/data';

interface OrdersRowProps {
  order: Order;
}

const OrdersRow: FC<OrdersRowProps> = ({ order }) => {
  const navigate = useNavigate();

  const onClick = () => navigate(`/orders/${order.id}`);

  return (
    <Tr
      _hover={{
        backgroundColor: 'gray.50',
        cursor: 'pointer',
      }}
      onClick={onClick}
    >
      <Td>{order.number}</Td>
      <Td>{order.fullName}</Td>
      <Td>{order.phone}</Td>
      <Td>{order.address}</Td>
      <Td>{statuses.order[order.status]}</Td>
    </Tr>
  );
};

export default OrdersRow;
