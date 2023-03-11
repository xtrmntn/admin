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
import { Property, updateProperty } from '@/services/properties';
import { toast } from '@/utils/toast';

interface UpdatePropertyFormProps {
  property: Property;
  onClose: () => void;
}

const UpdatePropertyForm: FC<UpdatePropertyFormProps> = ({ property, onClose }) => {
  const queryClient = useQueryClient();
  const { mutate: onUpdate, isLoading } = useMutation(updateProperty, {
    onSuccess() {
      toast({ description: 'Характеристика успешно обновлена', status: 'success' });
      queryClient.invalidateQueries('properties');
      onClose();
    },
  });

  const getData = (form: HTMLFormElement) => {
    const data = new FormData(form);
    return {
      id: property.id,
      name: data.get('name') as string,
    };
  };

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = getData(e.currentTarget);
    if (data.name === property.name) {
      onClose();
      return;
    }
    onUpdate(data);
  };

  return (
    <form onSubmit={onSubmit}>
      <ModalBody>
        <FormControl isRequired>
          <FormLabel>Наименование</FormLabel>
          <Input
            name="name"
            placeholder="Наименование"
            defaultValue={property.name}
          />
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

export default UpdatePropertyForm;
