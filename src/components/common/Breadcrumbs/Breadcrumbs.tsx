import { FC } from 'react';
import { Breadcrumb, BreadcrumbItem } from '@chakra-ui/react';
import { CategoryWithParent } from '@/services/categories';
import Link from '../Link';

interface BreadcrumbsProps {
  category: CategoryWithParent;
}

const getParentCategories = (category: CategoryWithParent): CategoryWithParent[] => (
  category.parent
    ? [...getParentCategories(category.parent), category]
    : [category]
);

const Breadcrumbs: FC<BreadcrumbsProps> = ({ category }) => {
  const categories = getParentCategories(category);

  return (
    <Breadcrumb>
      <BreadcrumbItem key={category.id}>
        <Link to="/categories">
          Категории
        </Link>
      </BreadcrumbItem>

      {categories.map((category) => (
        <BreadcrumbItem key={category.id}>
          <Link to={`/categories/${category.slug}`}>
            {category.name}
          </Link>
        </BreadcrumbItem>
      ))}
    </Breadcrumb>
  );
};

export default Breadcrumbs;
