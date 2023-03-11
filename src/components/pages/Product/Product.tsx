import { FC, lazy } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useMutation, useQueryClient } from 'react-query';
import {
  Divider, ModalHeader, Spinner, Stack, Text, useDisclosure,
} from '@chakra-ui/react';
import { removeProduct } from '@/services/products';
import { useGetProduct } from '@/hooks/products';
import { withSuspense } from '@/hoc/withSuspense';
import { formatBoolean, formatPrice } from '@/utils/format';
import { toast } from '@/utils/toast';
import Actions from '@/components/common/Actions';
import Link from '@/components/common/Link';
import ProductProperties from './ProductProperties';
import Modal from '@/components/common/Modal';
import ProductImage from './ProductImage/ProductImage';

const UpdateProductForm = withSuspense(lazy(() => import('./UpdateProductForm')), { margin: '30px' });

const Product: FC = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const queryClient = useQueryClient();
  const { data: product, isLoading, isSuccess } = useGetProduct(slug as string);
  const { mutate: onRemove, isLoading: isRemoving } = useMutation(removeProduct, {
    onSuccess() {
      toast({ description: 'Товар успешно удален', status: 'success' });
      queryClient.invalidateQueries('products');
      queryClient.invalidateQueries(['product', slug]);
      navigate('/products');
    },
  });

  const handleRemove = () => {
    if (!isSuccess) return;
    onRemove(product.id);
  };

  if (isLoading) {
    return <Spinner />;
  }

  return isSuccess ? (
    <>
      <Stack divider={<Divider />}>
        <Actions
          confirmText="Вы действительно хотите удалить товар?"
          isRemoving={isRemoving}
          onRemove={handleRemove}
          onUpdate={onOpen}
        />

        <Stack>
          <Text as="b">Изображение:</Text>
          <ProductImage product={product} />
        </Stack>

        <Stack>
          <Text as="b">Наименование:</Text>
          <Text>{product.name}</Text>
        </Stack>

        <Stack>
          <Text as="b">Стоимость:</Text>
          <Text>{formatPrice(product.price)}</Text>
        </Stack>

        <Stack>
          <Text as="b">В наличии:</Text>
          <Text>{formatBoolean(product.inStock)}</Text>
        </Stack>

        {product.description && (
          <Stack>
            <Text as="b">Описание:</Text>
            <Text>{product.description}</Text>
          </Stack>
        )}

        <Stack alignItems="flex-start">
          <Text as="b">Категория:</Text>
          <Link to={`/categories/${product.category.slug}`}>
            {product.category.name}
          </Link>
        </Stack>

        <ProductProperties product={product} />
      </Stack>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalHeader>{product.name}</ModalHeader>
        <UpdateProductForm product={product} onClose={onClose} />
      </Modal>
    </>
  ) : null;
};

export default Product;
