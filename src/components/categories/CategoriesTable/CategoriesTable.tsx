import { FC } from 'react';
import {
  Table, TableContainer, Tbody, Th, Thead, Tr,
} from '@chakra-ui/react';
import CategoriesRow from './CategoriesRow';
import { Category } from '@/services/categories';

interface CategoriesTableProps {
  categories: Category[];
}

const CategoriesTable: FC<CategoriesTableProps> = ({ categories }) => (
  <TableContainer>
    <Table>
      <Thead>
        <Tr>
          <Th>Наименование</Th>
        </Tr>
      </Thead>
      <Tbody>
        {categories.map((category) => (
          <CategoriesRow
            key={category.id}
            category={category}
          />
        ))}
      </Tbody>
    </Table>
  </TableContainer>
);

export default CategoriesTable;
