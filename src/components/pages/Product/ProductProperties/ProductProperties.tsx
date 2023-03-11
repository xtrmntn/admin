import { FC, lazy } from 'react';
import { MdAdd } from 'react-icons/md';
import {
  HStack, IconButton, ModalHeader, Stack, Text, useDisclosure,
} from '@chakra-ui/react';
import { ProductWithRelations } from '@/services/products';
import { withSuspense } from '@/hoc/withSuspense';
import Tooltip from '@/components/common/Tooltip';
import Modal from '@/components/common/Modal';
import ProductPropertiesItem from './ProductPropertiesItem';

interface ProductPropertiesProps {
  product: ProductWithRelations;
}

const CreateProductPropertyForm = withSuspense(lazy(() => import('./CreateProductPropertyForm')), { margin: '30px' });

const ProductProperties: FC<ProductPropertiesProps> = ({ product }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <Stack>
      <HStack>
        <Text as="b">Характеристики:</Text>

        <Tooltip label="Добавить">
          <IconButton
            size="sm"
            icon={<MdAdd />}
            aria-label="Добавить"
            onClick={onOpen}
          />
        </Tooltip>

        <Modal isOpen={isOpen} onClose={onClose}>
          <ModalHeader>
            {product.name}
            {' – '}
            Новая характеристика
          </ModalHeader>
          <CreateProductPropertyForm product={product} onClose={onClose} />
        </Modal>
      </HStack>

      <Stack>
        {product.properties.length ? (
          product.properties.map((property) => (
            <ProductPropertiesItem
              key={property.id}
              product={product}
              property={property}
            />
          ))
        ) : (
          <Text>Список пуст</Text>
        )}
      </Stack>
    </Stack>
  );
};

export default ProductProperties;
