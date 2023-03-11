import { FC, lazy } from 'react';
import { useMutation, useQueryClient } from 'react-query';
import {
  HStack, ModalHeader, Td, Tr, useDisclosure,
} from '@chakra-ui/react';
import { Property, removeProperty } from '@/services/properties';
import { toast } from '@/utils/toast';
import Modal from '@/components/common/Modal';
import PropertiesActions from '@/components/properties/PropertiesActions';
import { withSuspense } from '@/hoc/withSuspense';

interface PropertiesRowProps {
  property: Property;
}

const UpdatePropertyForm = withSuspense(lazy(() => import('./UpdatePropertyForm')), { margin: '30px' });

const PropertiesRow: FC<PropertiesRowProps> = ({ property }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const queryClient = useQueryClient();
  const { mutate: onRemove, isLoading: isRemoving } = useMutation(removeProperty, {
    onSuccess() {
      toast({ description: 'Характеристика успешно удалена', status: 'success' });
      queryClient.invalidateQueries('properties');
    },
  });

  const handleRemove = () => onRemove(property.id);

  return (
    <Tr>
      <Td>{property.name}</Td>
      <Td>
        <HStack>
          <PropertiesActions
            isRemoving={isRemoving}
            onUpdate={onOpen}
            onRemove={handleRemove}
          />

          <Modal isOpen={isOpen} onClose={onClose}>
            <ModalHeader>{property.name}</ModalHeader>

            <UpdatePropertyForm property={property} onClose={onClose} />
          </Modal>
        </HStack>
      </Td>
    </Tr>
  );
};

export default PropertiesRow;
