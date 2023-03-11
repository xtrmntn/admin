import {
  ChangeEvent, FC, lazy, useMemo,
} from 'react';
import { useSearchParams } from 'react-router-dom';
import { MdAdd } from 'react-icons/md';
import {
  Button, Center, Input, ModalHeader, Spinner, Stack, useDisclosure,
} from '@chakra-ui/react';
import { useSearch } from '@/hooks/search';
import { useGetProperties } from '@/hooks/properties';
import { withSuspense } from '@/hoc/withSuspense';
import Modal from '@/components/common/Modal';
import Pagination from '@/components/common/Pagination';
import PropertiesTable from './PropertiesTable';

const CreatePropertyForm = withSuspense(lazy(() => import('./CreatePropertyForm')), { margin: '30px' });

const Properties: FC = () => {
  const [search, setSearch] = useSearch();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [searchParams] = useSearchParams();
  const params = useMemo(() => Object.fromEntries(searchParams.entries()), [searchParams]);
  const { data, isLoading, isSuccess } = useGetProperties(params);

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
        <ModalHeader>Новая характеристика</ModalHeader>
        <CreatePropertyForm onClose={onClose} />
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
          <PropertiesTable properties={data.items} />
          <Pagination total={data.total} count={data.count} />
        </>
      )}
    </Stack>
  );
};

export default Properties;
