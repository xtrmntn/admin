import { FC, lazy } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import {
  Heading, ModalHeader, Spinner, Stack, useDisclosure,
} from '@chakra-ui/react';
import { getCategory, removeCategory } from '@/services/categories';
import { toast } from '@/utils/toast';
import { withSuspense } from '@/hoc/withSuspense';
import Breadcrumbs from '@/components/common/Breadcrumbs';
import CategoriesTable from '@/components/categories/CategoriesTable';
import Actions from '@/components/common/Actions';
import CreateCategory from '@/components/categories/CreateCategory';
import Modal from '@/components/common/Modal';
import CategoryImage from './CategoryImage';

const UpdateCategoryForm = withSuspense(lazy(() => import('./UpdateCategoryForm')), { margin: '30px' });

const Category: FC = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const queryClient = useQueryClient();
  const { data: category, isLoading, isSuccess } = useQuery(['category', slug], () => getCategory(slug as string));
  const { mutate: onRemove, isLoading: isRemoving } = useMutation(removeCategory, {
    onSuccess() {
      toast({ description: 'Категория успешно удалена', status: 'success' });
      queryClient.invalidateQueries('products');
      queryClient.invalidateQueries('categories');
      queryClient.invalidateQueries(['category', slug]);
      navigate('/categories');
    },
  });

  const handleRemove = () => {
    if (!isSuccess) return;
    onRemove(category.id);
  };

  if (isLoading) {
    return <Spinner />;
  }

  return isSuccess ? (
    <Stack gap="20px">
      <Actions
        confirmText="Вы действительно хотите удалить категорию?"
        isRemoving={isRemoving}
        onRemove={handleRemove}
        onUpdate={onOpen}
      >
        <CreateCategory parentId={category.id} />
      </Actions>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalHeader>{category.name}</ModalHeader>
        <UpdateCategoryForm category={category} onClose={onClose} />
      </Modal>

      <Breadcrumbs category={category} />

      <Heading size="md">{category.name}</Heading>

      <CategoryImage category={category} />

      {category.children.length ? <CategoriesTable categories={category.children} /> : null}
    </Stack>
  ) : null;
};

export default Category;
