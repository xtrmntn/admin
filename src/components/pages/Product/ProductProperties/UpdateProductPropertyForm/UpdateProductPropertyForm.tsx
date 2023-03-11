import { FC, FormEvent } from 'react';
import { useMutation, useQueryClient } from 'react-query';
import {
  Button, FormControl, FormLabel, Input, ModalBody, ModalFooter,
} from '@chakra-ui/react';
import { Product, Property, updateProductProperty } from '@/services/products';
import { toast } from '@/utils/toast';

interface UpdateProductPropertyFormProps {
  product: Product;
  property: Property;
  onClose: () => void;
}

const UpdateProductPropertyForm: FC<UpdateProductPropertyFormProps> = ({
  product, property, onClose,
}) => {
  const queryClient = useQueryClient();
  const { mutate: onUpdate, isLoading } = useMutation(updateProductProperty, {
    onSuccess() {
      toast({ description: 'Характеристика успешно обновлена', status: 'success' });
      queryClient.invalidateQueries(['product', product.slug]);
      onClose();
    },
  });

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const value = data.get('value') as string;
    if (value === property.value) {
      onClose();
      return;
    }
    onUpdate({
      id: property.id,
      value,
    });
  };

  return (
    <form onSubmit={onSubmit}>
      <ModalBody>
        <FormControl isRequired>
          <FormLabel>Значение</FormLabel>
          <Input
            name="value"
            placeholder="Значение"
            defaultValue={property.value}
          />
        </FormControl>
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

export default UpdateProductPropertyForm;
