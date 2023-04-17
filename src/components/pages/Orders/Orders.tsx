import { ChangeEvent, FC, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import {
  Center, HStack, Input, Select, Spinner, Stack,
} from '@chakra-ui/react';
import OrdersTable from './OrdersTable';
import { useSearch } from '@/hooks/search';
import { useGetOrders } from '@/hooks/orders';
import Pagination from '@/components/common/Pagination';
import { statuses } from '@/core/data';

const Orders: FC = () => {
  const [search, setSearch] = useSearch();
  const [searchParams, setSearchParams] = useSearchParams();
  const params = useMemo(() => Object.fromEntries(searchParams.entries()), [searchParams]);
  const { data, isLoading, isSuccess } = useGetOrders(params);

  const onSearch = (e: ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  const onSelectStatus = (e: ChangeEvent<HTMLSelectElement>) => {
    const status = e.target.value;
    setSearchParams((prev) => {
      const params = new URLSearchParams({
        ...Object.fromEntries(prev.entries()),
        status,
      });
      if (status === 'all' || !status) params.delete('status');
      return params;
    });
  };

  return (
    <Stack gap="20px">
      <HStack>
        <Input
          value={search}
          placeholder="Поиск"
          onChange={onSearch}
        />

        <Select
          flexBasis="200px"
          placeholder="Выберите статус"
          onChange={onSelectStatus}
        >
          <option value="all">Все</option>
          {Object.entries(statuses.order).map(([key, value]) => (
            <option key={key} value={key}>{value}</option>
          ))}
        </Select>
      </HStack>

      {isLoading ? (
        <Center>
          <Spinner />
        </Center>
      ) : isSuccess && (
        <>
          <OrdersTable orders={data.items} />
          <Pagination total={data.total} count={data.count} />
        </>
      )}
    </Stack>
  );
};

export default Orders;
