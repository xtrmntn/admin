import { FC } from 'react';
import {
  Table, TableContainer, Tbody, Th, Thead, Tr,
} from '@chakra-ui/react';
import { Product } from '@/services/products';
import ProductsRow from './ProductsRow';

interface ProductsTableProps {
  products: Product[];
}

const ProductsTable: FC<ProductsTableProps> = ({ products }) => (
  <TableContainer>
    <Table>
      <Thead>
        <Tr>
          <Th>Наименование</Th>
          <Th>Стоимость</Th>
          <Th>В наличии</Th>
        </Tr>
      </Thead>
      <Tbody>
        {products.map((product) => (
          <ProductsRow
            key={product.id}
            product={product}
          />
        ))}
      </Tbody>
    </Table>
  </TableContainer>
);

export default ProductsTable;
