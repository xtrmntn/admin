import { FC } from 'react';
import { useNavigate } from 'react-router-dom';
import { Td, Tr } from '@chakra-ui/react';
import { Category } from '@/services/categories';

interface CategoriesRowProps {
  category: Category;
}

const CategoriesRow: FC<CategoriesRowProps> = ({ category }) => {
  const navigate = useNavigate();

  const onClick = () => navigate(`/categories/${category.slug}`);

  return (
    <Tr
      _hover={{
        backgroundColor: 'gray.50',
        cursor: 'pointer',
      }}
      onClick={onClick}
    >
      <Td>{category.name}</Td>
    </Tr>
  );
};

export default CategoriesRow;
