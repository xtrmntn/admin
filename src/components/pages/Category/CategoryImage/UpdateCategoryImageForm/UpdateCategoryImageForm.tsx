import { FC, FormEvent } from 'react';
import {
  Button, FormControl, FormLabel, ModalBody, ModalFooter,
} from '@chakra-ui/react';
import { useMutation, useQueryClient } from 'react-query';
import { updateCategoryImage } from '@/services/categories';
import { toast } from '@/utils/toast';

interface UpdateCategoryImageFormProps {
  id: number;
  onClose: () => void;
}

const UpdateCategoryImageForm: FC<UpdateCategoryImageFormProps> = ({ id, onClose }) => {
  const queryClient = useQueryClient();
  const { mutate: onUpdate, isLoading } = useMutation(updateCategoryImage, {
    onSuccess(data) {
      toast({ description: 'Изображение успешно обновлено', status: 'success' });
      queryClient.invalidateQueries('categories');
      queryClient.invalidateQueries(['category', data.slug]);
      onClose();
    },
  });

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const image = data.get('image') as File;
    if (image.size === 0) {
      onClose();
      return;
    }
    onUpdate({ id, image });
  };

  return (
    <form onSubmit={onSubmit}>
      <ModalBody>
        <FormControl>
          <FormLabel>Изображение</FormLabel>
          <input name="image" type="file" accept="image/*" />
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

export default UpdateCategoryImageForm;
