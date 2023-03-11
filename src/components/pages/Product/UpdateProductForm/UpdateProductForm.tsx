import {
  ChangeEvent, FC, FormEvent, useState,
} from 'react';
import { useNavigate } from 'react-router-dom';
import { useMutation, useQueryClient } from 'react-query';
import {
  Button,
  Checkbox,
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
import { ProductWithRelations, updateProduct } from '@/services/products';
import { useGetAllCategories } from '@/hooks/categories';
import { toast } from '@/utils/toast';

interface UpdateProductFormProps {
  product: ProductWithRelations;
  onClose: () => void;
}

const UpdateProductForm: FC<UpdateProductFormProps> = ({ product, onClose }) => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: product.name,
    price: product.price,
    categoryId: product.category.id,
    description: product.description,
    inStock: product.inStock,
  });
  const queryClient = useQueryClient();
  const { data: categories = [], isSuccess } = useGetAllCategories();
  const { mutate: onUpdate, isLoading } = useMutation(updateProduct, {
    onSuccess(data) {
      toast({ description: 'Товар успешно обновлен', status: 'success' });
      queryClient.invalidateQueries('products');
      queryClient.invalidateQueries(['product', product.slug]);
      onClose();
      if (product.slug !== data.slug) {
        navigate(`/products/${data.slug}`, { replace: true });
      }
    },
  });

  const onChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const onPriceChange = (value: string) => {
    setForm((prev) => ({
      ...prev,
      price: Number(value),
    }));
  };

  const onCheckboxChange = (e: ChangeEvent<HTMLInputElement>) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.checked,
    }));
  };

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onUpdate({
      ...form,
      id: product.id,
      name: form.name === product.name ? undefined : form.name,
    });
  };

  return (
    <form onSubmit={onSubmit}>
      <ModalBody>
        <Stack gap="20px">
          <FormControl isRequired>
            <FormLabel>Наименование</FormLabel>
            <Input
              name="name"
              placeholder="Наименование"
              defaultValue={product.name}
              onChange={onChange}
            />
          </FormControl>

          <FormControl isRequired>
            <FormLabel>Стоимость</FormLabel>
            <NumberInput
              name="price"
              min={0}
              defaultValue={product.price}
              onChange={onPriceChange}
            >
              <NumberInputField placeholder="Стоимость" />
              <NumberInputStepper>
                <NumberIncrementStepper />
                <NumberDecrementStepper />
              </NumberInputStepper>
            </NumberInput>
          </FormControl>

          {isSuccess && (
            <FormControl isRequired>
              <FormLabel>Категория</FormLabel>
              <Select
                name="categoryId"
                placeholder="Категория"
                defaultValue={product.category.id}
                onChange={onChange}
              >
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
          )}

          <FormControl>
            <FormLabel>Описание</FormLabel>
            <Textarea
              name="description"
              placeholder="Описание"
              defaultValue={product.description || ''}
              onChange={onChange}
            />
          </FormControl>

          <FormControl>
            <Checkbox
              name="inStock"
              defaultChecked={product.inStock}
              onChange={onCheckboxChange}
            >
              В наличии
            </Checkbox>
          </FormControl>
        </Stack>
      </ModalBody>

      <ModalFooter>
        <Button type="submit" isLoading={isLoading}>
          Редактировать
        </Button>
      </ModalFooter>
    </form>
  );
};

export default UpdateProductForm;
