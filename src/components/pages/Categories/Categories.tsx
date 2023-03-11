import { FC } from 'react';
import { Spinner, Stack } from '@chakra-ui/react';
import CategoriesTable from '@/components/categories/CategoriesTable';
import { useGetCategories } from '@/hooks/categories';
import CreateCategory from '@/components/categories/CreateCategory';

const Categories: FC = () => {
  const { data: categories, isLoading, isSuccess } = useGetCategories();

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
