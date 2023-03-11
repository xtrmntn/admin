import { FC, lazy } from 'react';
import { useMutation, useQueryClient } from 'react-query';
import {
  HStack, ModalHeader, Text, useDisclosure,
} from '@chakra-ui/react';
import PropertiesActions from '@/components/properties/PropertiesActions';
import Modal from '@/components/common/Modal';
import { Product, Property, removeProductProperty } from '@/services/products';
import { toast } from '@/utils/toast';
import { withSuspense } from '@/hoc/withSuspense';

interface ProductPropertiesItemProps {
  product: Product;
  property: Property;
}

const UpdateProductPropertyForm = withSuspense(lazy(() => import('../UpdateProductPropertyForm')), { margin: '30px' });

const ProductPropertiesItem: FC<ProductPropertiesItemProps> = ({ product, property }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const queryClient = useQueryClient();
  const { mutate: onRemove, isLoading: isRemoving } = useMutation(removeProductProperty, {
    onSuccess() {
      toast({ description: 'Характеристика успешно удалена', status: 'success' });
      queryClient.invalidateQueries(['product', product.slug]);
    },
  });

  const handleRemove = () => onRemove(property.id);

  return (
    <HStack>
      <Text>
        {property.property.name}
        {' – '}
        {property.value}
      </Text>

      <PropertiesActions
        isRemoving={isRemoving}
        onRemove={handleRemove}
        onUpdate={onOpen}
      />

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalHeader>
          {product.name}
          {' – '}
          {property.property.name}
        </ModalHeader>

        <UpdateProductPropertyForm
          product={product}
          property={property}
          onClose={onClose}
        />
      </Modal>
    </HStack>
  );
};

export default ProductPropertiesItem;
