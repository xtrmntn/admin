import { FC, FormEvent } from 'react';
import {
  Button,
  FormControl,
  FormLabel,
  Input,
  ModalBody,
  ModalFooter,
} from '@chakra-ui/react';
import { useMutation, useQueryClient } from 'react-query';
import { toast } from '@/utils/toast';
import { createProperty } from '@/services/properties';

interface CreatePropertyFormProps {
  onClose: () => void;
}

const CreatePropertyForm: FC<CreatePropertyFormProps> = ({ onClose }) => {
  const queryClient = useQueryClient();
  const { mutate: onCreate, isLoading } = useMutation(createProperty, {
    onSuccess() {
      toast({ description: 'Характеристика успешно добавлена', status: 'success' });
      queryClient.invalidateQueries('properties');
      onClose();
    },
  });

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    onCreate(data.get('name') as string);
  };

  return (
    <form onSubmit={onSubmit}>
      <ModalBody>
        <FormControl isRequired>
          <FormLabel>Наименование</FormLabel>
          <Input name="name" placeholder="Наименование" />
        </FormControl>
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

export default CreatePropertyForm;
