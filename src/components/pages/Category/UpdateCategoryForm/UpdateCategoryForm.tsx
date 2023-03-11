import { FC, FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import {
  Button,
  FormControl, FormLabel, Input, ModalBody, ModalFooter, Select, Stack,
} from '@chakra-ui/react';
import { CategoryWithParent, getAllCategories, updateCategory } from '@/services/categories';
import { toast } from '@/utils/toast';

interface UpdateCategoryFormProps {
  category: CategoryWithParent;
  onClose: () => void;
}

const UpdateCategoryForm: FC<UpdateCategoryFormProps> = ({ category, onClose }) => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { data: categories = [], isSuccess } = useQuery(['categories', 'all'], getAllCategories);
  const { mutate: onUpdate, isLoading } = useMutation(updateCategory, {
    onSuccess(data) {
      toast({ description: 'Категория успешно обновлена', status: 'success' });
      queryClient.invalidateQueries('categories');
      queryClient.invalidateQueries(['category', category.slug]);
      onClose();
      if (category.slug !== data.slug) {
        navigate(`/categories/${data.slug}`, { replace: true });
      }
    },
  });

  const getData = (form: HTMLFormElement) => {
    const data = new FormData(form);
    const name = data.get('name') as string;
    const parentId = Number(data.get('parentId')) || null;
    return {
      id: category.id,
      name: name === category.name ? undefined : name,
      parentId: parentId === category.parent?.id ? undefined : parentId,
    };
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
            <FormLabel>Наименование</FormLabel>
            <Input
              name="name"
              placeholder="Наименование"
              defaultValue={category.name}
            />
          </FormControl>

          {isSuccess && (
            <FormControl>
              <FormLabel>Родительская категория</FormLabel>
              <Select
                name="parentId"
                placeholder="Родительская категория"
                defaultValue={category.parent?.id}
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

export default UpdateCategoryForm;
