import { FC } from 'react';
import { useQuery } from 'react-query';
import { Spinner, Stack } from '@chakra-ui/react';
import CategoriesTable from '@/components/categories/CategoriesTable';
import { getCategories } from '@/services/categories';
import CreateCategory from '@/components/categories/CreateCategory';

const Categories: FC = () => {
  const { data: categories, isLoading, isSuccess } = useQuery('categories', getCategories);

  if (isLoading) {
    return <Spinner />;
  }

  return isSuccess ? (
    <Stack gap="20px">
      <CreateCategory />
      <CategoriesTable categories={categories} />
    </Stack>
  ) : null;
};

export default Categories;
