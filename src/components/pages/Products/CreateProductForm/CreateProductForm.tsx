import { FC, FormEvent } from 'react';
import {
  Button,
  FormControl,
  FormLabel,
  Input,
  ModalBody,
  ModalFooter,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  Select,
  Stack,
  Textarea,
} from '@chakra-ui/react';
import { useMutation, useQueryClient } from 'react-query';
import { createProduct } from '@/services/products';
import { useGetAllCategories } from '@/hooks/categories';
import { toast } from '@/utils/toast';

interface CreateProductFormProps {
  onClose: () => void;
}

const CreateProductForm: FC<CreateProductFormProps> = ({ onClose }) => {
  const queryClient = useQueryClient();
  const { data: categories = [] } = useGetAllCategories();
  const { mutate: onCreate, isLoading } = useMutation(createProduct, {
    onSuccess() {
      toast({ description: 'Товар успешно добавлен', status: 'success' });
      queryClient.invalidateQueries('products');
      onClose();
    },
  });

  const getData = (form: HTMLFormElement) => {
    const data = new FormData(form);
    if (!data.get('description')) {
      data.delete('description');
    }
    return data;
  };

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = getData(e.currentTarget);
    onCreate(data);
  };

  return (
    <form onSubmit={onSubmit}>
      <ModalBody>
        <Stack gap="20px">
          <FormControl isRequired>
            <FormLabel>Наименование</FormLabel>
            <Input name="name" placeholder="Наименование" />
          </FormControl>

          <FormControl isRequired>
            <FormLabel>Стоимость</FormLabel>
            <NumberInput name="price" min={0}>
              <NumberInputField placeholder="Стоимость" />
              <NumberInputStepper>
                <NumberIncrementStepper />
                <NumberDecrementStepper />
              </NumberInputStepper>
            </NumberInput>
          </FormControl>

          <FormControl isRequired>
            <FormLabel>Категория</FormLabel>
            <Select name="categoryId" placeholder="Категория">
              {categories.map((category) => (
                <option
                  key={category.id}
                  value={category.id}
                >
                  {category.name}
                </option>
              ))}
            </Select>
          </FormControl>

          <FormControl>
            <FormLabel>Изображение</FormLabel>
            <input name="image" type="file" accept="image/*" />
          </FormControl>

          <FormControl>
            <FormLabel>Описание</FormLabel>
            <Textarea name="description" placeholder="Описание" />
          </FormControl>
        </Stack>
      </ModalBody>

      <ModalFooter>
        <Button type="submit" isLoading={isLoading}>
          Добавить
        </Button>
      </ModalFooter>
    </form>
  );
};

export default CreateProductForm;
