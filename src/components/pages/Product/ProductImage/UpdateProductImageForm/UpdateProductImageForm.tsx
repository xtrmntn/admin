import { FC, FormEvent } from 'react';
import {
  Button, FormControl, FormLabel, ModalBody, ModalFooter,
} from '@chakra-ui/react';
import { useMutation, useQueryClient } from 'react-query';
import { updateProductImage } from '@/services/products';
import { toast } from '@/utils/toast';

interface UpdateProductImageFormProps {
  id: number;
  onClose: () => void;
}

const UpdateProductImageForm: FC<UpdateProductImageFormProps> = ({ id, onClose }) => {
  const queryClient = useQueryClient();
  const { mutate: onUpdate, isLoading } = useMutation(updateProductImage, {
    onSuccess(data) {
      toast({ description: 'Изображение успешно обновлено', status: 'success' });
      queryClient.invalidateQueries('products');
      queryClient.invalidateQueries(['product', data.slug]);
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

export default UpdateProductImageForm;
