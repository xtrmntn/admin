import { FC } from 'react';
import {
  Table, TableContainer, Tbody, Th, Thead, Tr,
} from '@chakra-ui/react';
import { Order } from '@/services/orders';
import OrdersRow from './OrdersRow';

interface OrdersTableProps {
  orders: Order[];
}

const OrdersTable: FC<OrdersTableProps> = ({ orders }) => (
  <TableContainer>
    <Table>
      <Thead>
        <Tr>
          <Th>Номер</Th>
          <Th>ФИО</Th>
          <Th>Телефон</Th>
          <Th>Адрес</Th>
          <Th>Статус</Th>
        </Tr>
      </Thead>
      <Tbody>
        {orders.map((order) => (
          <OrdersRow
            key={order.id}
            order={order}
          />
        ))}
      </Tbody>
    </Table>
  </TableContainer>
);

export default OrdersTable;
