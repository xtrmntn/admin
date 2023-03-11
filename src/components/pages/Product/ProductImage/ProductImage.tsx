import { FC, lazy } from 'react';
import { useMutation, useQueryClient } from 'react-query';
import { MdDelete, MdModeEdit } from 'react-icons/md';
import {
  Box, HStack, IconButton, Image, ModalHeader, useDisclosure,
} from '@chakra-ui/react';
import Tooltip from '@/components/common/Tooltip';
import Confirm from '@/components/common/Confirm';
import Modal from '@/components/common/Modal';
import { Product, removeProductImage } from '@/services/products';
import { withSuspense } from '@/hoc/withSuspense';
import { toast } from '@/utils/toast';

const UpdateProductImageForm = withSuspense(lazy(() => import('./UpdateProductImageForm')), { margin: '30px' });

interface ProductImageProps {
  product: Product;
}

const ProductImage: FC<ProductImageProps> = ({ product }) => {
  const queryClient = useQueryClient();
  const { mutate: onRemove, isLoading: isRemoving } = useMutation(removeProductImage, {
    onSuccess() {
      toast({ description: 'Изображение успешно удалено', status: 'success' });
      queryClient.invalidateQueries('products');
      queryClient.invalidateQueries(['product', product.slug]);
    },
  });
  const { isOpen, onOpen, onClose } = useDisclosure();

  const handleRemove = () => onRemove(product.id);

  return (
    <>
      <Box width={400} position="relative">
        <HStack position="absolute" top="10px" right="10px">
          <Tooltip label="Редактировать">
            <IconButton
              size="sm"
              icon={<MdModeEdit />}
              aria-label="Редактировать"
              colorScheme="twitter"
              onClick={onOpen}
            />
          </Tooltip>

          {product.image && (
            <Confirm
              text="Вы действительно хотите удалить изображение?"
              isLoading={isRemoving}
              onConfirm={handleRemove}
            >
              <IconButton
                size="sm"
                icon={<MdDelete />}
                aria-label="Удалить"
                colorScheme="red"
              />
            </Confirm>
          )}
        </HStack>

        <Image
          width="100%"
          src={product.image ? `${import.meta.env.VITE_UPLOADS_URL}/${product.image}` : '/placeholder.svg'}
          alt={product.name}
        />
      </Box>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalHeader>{product.name}</ModalHeader>
        <UpdateProductImageForm id={product.id} onClose={onClose} />
      </Modal>
    </>
  );
};

export default ProductImage;
