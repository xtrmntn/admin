import { FC, FormEvent } from 'react';
import { useMutation, useQueryClient } from 'react-query';
import {
  Button, FormControl, FormLabel, Input, ModalBody, ModalFooter, Select, Stack,
} from '@chakra-ui/react';
import { createProductProperty, Product } from '@/services/products';
import { useGetAllProperties } from '@/hooks/properties';
import { toast } from '@/utils/toast';

interface CreateProductPropertyFormProps {
  product: Product;
  onClose: () => void;
}

const CreateProductPropertyForm: FC<CreateProductPropertyFormProps> = ({ product, onClose }) => {
  const queryClient = useQueryClient();
  const { data: properties, isLoading, isSuccess } = useGetAllProperties();
  const { mutate: onCreate } = useMutation(createProductProperty, {
    onSuccess() {
      toast({ description: 'Характеристика успешно добавлена', status: 'success' });
      queryClient.invalidateQueries(['product', product.slug]);
      onClose();
    },
  });

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    onCreate({
      productId: product.id,
      propertyId: Number(data.get('propertyId')),
      value: data.get('value') as string,
    });
  };

  return isSuccess ? (
    <form onSubmit={onSubmit}>
      <ModalBody>
        <Stack gap="20px">
          <FormControl isRequired>
            <FormLabel>Характеристика</FormLabel>
            <Select
              name="propertyId"
              placeholder="Характеристика"
            >
              {properties.map((property) => (
                <option
                  key={property.id}
                  value={property.id}
                >
                  {property.name}
                </option>
              ))}
            </Select>
          </FormControl>

          <FormControl isRequired>
            <FormLabel>Значение</FormLabel>
            <Input
              name="value"
              placeholder="Значение"
            />
          </FormControl>
        </Stack>
      </ModalBody>

      <ModalFooter>
        <Button
          type="submit"
          isLoading={isLoading}
        >
          Добавить
        </Button>
      </ModalFooter>
    </form>
  ) : null;
};

export default CreateProductPropertyForm;
