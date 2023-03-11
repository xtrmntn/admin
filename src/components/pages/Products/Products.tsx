import {
  ChangeEvent, FC, lazy, useMemo,
} from 'react';
import { useSearchParams } from 'react-router-dom';
import { MdAdd } from 'react-icons/md';
import {
  Button, Center, Input, ModalHeader, Spinner, Stack, useDisclosure,
} from '@chakra-ui/react';
import { useGetProducts } from '@/hooks/products';
import { withSuspense } from '@/hoc/withSuspense';
import Pagination from '@/components/common/Pagination';
import Modal from '@/components/common/Modal';
import ProductsTable from './ProductsTable';
import { useSearch } from '@/hooks/search';

const CreateProductForm = withSuspense(lazy(() => import('./CreateProductForm')), { margin: '30px' });

const Products: FC = () => {
  const [search, setSearch] = useSearch();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [searchParams] = useSearchParams();
  const params = useMemo(() => Object.fromEntries(searchParams.entries()), [searchParams]);
  const { data, isLoading, isSuccess } = useGetProducts(params);

  const onSearch = (e: ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  return (
    <Stack gap="20px">
      <Button
        leftIcon={<MdAdd />}
        width="fit-content"
        onClick={onOpen}
      >
        Добавить
      </Button>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalHeader>Новый товар</ModalHeader>
        <CreateProductForm onClose={onClose} />
      </Modal>

      <Input
        value={search}
        placeholder="Поиск"
        onChange={onSearch}
      />

      {isLoading ? (
        <Center>
          <Spinner />
        </Center>
      ) : isSuccess && (
        <>
          <ProductsTable products={data.items} />
          <Pagination total={data.total} count={data.count} />
        </>
      )}
    </Stack>
  );
};

export default Products;
