import { FC, lazy } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { MdArrowBack, MdModeEdit } from 'react-icons/md';
import {
  Button, HStack, ModalHeader, Spinner, Stack, useDisclosure,
} from '@chakra-ui/react';
import { useGetOrder } from '@/hooks/orders';
import OrderInfo from './OrderInfo';
import Modal from '@/components/common/Modal';
import { withSuspense } from '@/hoc/withSuspense';

const UpdateOrderForm = withSuspense(lazy(() => import('./UpdateOrderForm')), { margin: '30px' });

const Order: FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { data, isLoading, isSuccess } = useGetOrder(Number(id));

  const onBack = () => navigate(-1);

  if (isLoading) {
    return <Spinner />;
  }

  return isSuccess ? (
    <Stack gap="20px">
      <HStack>
        <Button colorScheme="gray" onClick={onBack}>
          <MdArrowBack />
        </Button>

        <Button
          leftIcon={<MdModeEdit />}
          colorScheme="twitter"
          onClick={onOpen}
        >
          Редактировать
        </Button>

        <Modal isOpen={isOpen} onClose={onClose}>
          <ModalHeader>{data.order.number}</ModalHeader>
          <UpdateOrderForm order={data.order} onClose={onClose} />
        </Modal>
      </HStack>

      <OrderInfo
        order={data.order}
        payment={data.payment}
      />
    </Stack>
  ) : null;
};

export default Order;
