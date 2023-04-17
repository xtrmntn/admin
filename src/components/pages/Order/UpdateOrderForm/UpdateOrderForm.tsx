import {
  ChangeEvent, FC, FormEvent, useState,
} from 'react';
import { useMutation, useQueryClient } from 'react-query';
import {
  Button, Checkbox, FormControl, FormLabel, Input, ModalBody, ModalFooter, Select, Stack,
} from '@chakra-ui/react';
import { Order, OrderStatus, updateOrder } from '@/services/orders';
import { toast } from '@/utils/toast';
import { statuses } from '@/core/data';

interface UpdateOrderFormProps {
  order: Order;
  onClose: () => void;
}

const UpdateOrderForm: FC<UpdateOrderFormProps> = ({ order, onClose }) => {
  const [isSelfPickup, setSelfPickup] = useState(false);
  const queryClient = useQueryClient();
  const { mutate: onUpdate, isLoading } = useMutation(updateOrder, {
    onSuccess() {
      toast({ description: 'Заказ успешно обновлен', status: 'success' });
      queryClient.invalidateQueries('orders');
      queryClient.invalidateQueries(['order', order.id]);
      onClose();
    },
  });

  const getData = (form: HTMLFormElement) => {
    const data = new FormData(form);
    const status = data.get('status') as OrderStatus;
    const address = data.get('address') as string;
    const transportCompany = data.get('transportCompany') as string;
    const trackNumber = data.get('trackNumber') as string;
    return {
      id: order.id,
      status,
      address,
      transportCompany: transportCompany || null,
      trackNumber: trackNumber || null,
    };
  };

  const onChangeSelfPickup = (e: ChangeEvent<HTMLInputElement>) => {
    setSelfPickup(e.target.checked);
  };

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = getData(e.currentTarget);
    onUpdate(data);
    onClose();
  };

  return (
    <form onSubmit={onSubmit}>
      <ModalBody>
        <Stack gap="20px">
          <FormControl isRequired>
            <FormLabel>Статус</FormLabel>
            <Select
              name="status"
              placeholder="Выберите статус заказа"
              defaultValue={order.status}
            >
              {Object.entries(statuses.order).map(([key, value]) => (
                <option key={key} value={key}>{value}</option>
              ))}
            </Select>
          </FormControl>

          <Checkbox
            checked={isSelfPickup}
            width="100%"
            onChange={onChangeSelfPickup}
          >
            Самовывоз из пункта выдачи
          </Checkbox>

          <FormControl isRequired>
            <FormLabel>Адрес</FormLabel>
            {isSelfPickup ? (
              <Select
                name="address"
                placeholder="Выберите адрес пункта выдачи"
              >
                <option>г. Оренбург, пр. Гагарина, д. 27/5 (ЦВЗ Восток)</option>
                <option>г. Оренбург, ул. Терешковой, д. 251 (Озон)</option>
              </Select>
            ) : (
              <Input
                name="address"
                placeholder="Адрес"
                defaultValue={order.address}
              />
            )}
          </FormControl>

          <FormControl>
            <FormLabel>Транспортная компания</FormLabel>
            <Input
              name="transportCompany"
              placeholder="Транспортная компания"
              defaultValue={order.transportCompany || ''}
            />
          </FormControl>

          <FormControl>
            <FormLabel>Трек-номер</FormLabel>
            <Input
              name="trackNumber"
              placeholder="Трек-номер"
              defaultValue={order.trackNumber || ''}
            />
          </FormControl>
        </Stack>
      </ModalBody>

      <ModalFooter>
        <Button
          type="submit"
          isLoading={isLoading}
        >
          Редактировать
        </Button>
      </ModalFooter>
    </form>
  );
};

export default UpdateOrderForm;
