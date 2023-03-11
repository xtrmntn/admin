import { FC, lazy } from 'react';
import { useMutation, useQueryClient } from 'react-query';
import { MdDelete, MdModeEdit } from 'react-icons/md';
import {
  Box, HStack, IconButton, Image, ModalHeader, useDisclosure,
} from '@chakra-ui/react';
import { Category, removeCategoryImage } from '@/services/categories';
import Tooltip from '@/components/common/Tooltip';
import Confirm from '@/components/common/Confirm';
import Modal from '@/components/common/Modal';
import { withSuspense } from '@/hoc/withSuspense';
import { toast } from '@/utils/toast';

const UpdateCategoryImageForm = withSuspense(lazy(() => import('./UpdateCategoryImageForm')), { margin: '30px' });

interface CategoryImageProps {
  category: Category;
}

const CategoryImage: FC<CategoryImageProps> = ({ category }) => {
  const queryClient = useQueryClient();
  const { mutate: onRemove, isLoading: isRemoving } = useMutation(removeCategoryImage, {
    onSuccess() {
      toast({ description: 'Изображение успешно удалено', status: 'success' });
      queryClient.invalidateQueries('categories');
      queryClient.invalidateQueries(['category', category.slug]);
    },
  });
  const { isOpen, onOpen, onClose } = useDisclosure();

  const handleRemove = () => onRemove(category.id);

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

          {category.image && (
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
          src={category.image ? `${import.meta.env.VITE_UPLOADS_URL}/${category.image}` : '/placeholder.svg'}
          alt={category.name}
        />
      </Box>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalHeader>{category.name}</ModalHeader>
        <UpdateCategoryImageForm id={category.id} onClose={onClose} />
      </Modal>
    </>
  );
};

export default CategoryImage;
