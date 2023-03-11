import { FC, FormEvent } from 'react';
import {
  Button,
  FormControl,
  FormLabel,
  Input,
  ModalBody,
  ModalFooter,
  Select,
  Stack,
} from '@chakra-ui/react';
import { useMutation, useQueryClient } from 'react-query';
import { createCategory } from '@/services/categories';
import { useGetAllCategories } from '@/hooks/categories';
import { toast } from '@/utils/toast';

interface CreateCategoryFormProps {
  parentId?: number;
  onClose: () => void;
}

const CreateCategoryForm: FC<CreateCategoryFormProps> = ({ parentId, onClose }) => {
  const queryClient = useQueryClient();
  const { data: categories = [], isSuccess } = useGetAllCategories();
  const { mutate: onCreate, isLoading } = useMutation(createCategory, {
    onSuccess(data) {
      toast({ description: 'Категория успешно добавлена', status: 'success' });
      queryClient.invalidateQueries('categories');
      if (data.parent) {
        queryClient.invalidateQueries(['category', data.parent.slug]);
      }
      onClose();
    },
  });

  const getData = (form: HTMLFormElement) => {
    const data = new FormData(form);
    if (parentId) {
      data.set('parentId', parentId.toString());
    }
    if (!data.get('parentId')) {
      data.delete('parentId');
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

          {isSuccess && (
            <FormControl>
              <FormLabel>Родительская категория</FormLabel>
              <Select
                name="parentId"
                placeholder="Родительская категория"
                defaultValue={parentId}
                disabled={Boolean(parentId)}
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
            <FormLabel>Изображение</FormLabel>
            <input name="image" type="file" accept="image/*" />
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
  );
};

export default CreateCategoryForm;
