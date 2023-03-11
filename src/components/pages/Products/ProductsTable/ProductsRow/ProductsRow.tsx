import { ChangeEvent, FC, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useMutation, useQueryClient } from 'react-query';
import { Checkbox, Td, Tr } from '@chakra-ui/react';
import { theme } from '@/core/theme';
import { Product, updateProduct } from '@/services/products';
import { formatBoolean, formatPrice } from '@/utils/format';
import { toast } from '@/utils/toast';

interface ProductsRowProps {
  product: Product;
}

const ProductsRow: FC<ProductsRowProps> = ({ product }) => {
  const navigate = useNavigate();
  const [isHover, setIsHover] = useState(false);
  const queryClient = useQueryClient();
  const { mutate: onUpdate, isLoading } = useMutation(updateProduct, {
    onSuccess() {
      toast({ description: 'Товар успешно обновлен', status: 'success' });
      queryClient.invalidateQueries('products');
      queryClient.invalidateQueries(['product', product.slug]);
    },
  });

  const onMouseOver = () => setIsHover(true);

  const onMouseOut = () => setIsHover(false);

  const onClick = () => navigate(`/products/${product.slug}`);

  const onToggleStock = async (e: ChangeEvent<HTMLInputElement>) => {
    onUpdate({
      id: product.id,
      inStock: e.target.checked,
    });
  };

  return (
    <Tr
      {...isHover ? {
        backgroundColor: theme.colors.gray['50'],
        cursor: 'pointer',
      } : {}}
    >
      <Td
        onMouseOver={onMouseOver}
        onMouseOut={onMouseOut}
        onClick={onClick}
      >
        {product.name}
      </Td>
      <Td>{formatPrice(product.price)}</Td>
      <Td>
        <Checkbox
          defaultChecked={product.inStock}
          disabled={isLoading}
          onChange={onToggleStock}
        >
          {formatBoolean(product.inStock)}
        </Checkbox>
      </Td>
    </Tr>
  );
};

export default ProductsRow;
