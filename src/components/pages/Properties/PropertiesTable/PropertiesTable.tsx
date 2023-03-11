import {
  Table, TableContainer, Tbody, Th, Thead, Tr,
} from '@chakra-ui/react';
import { FC } from 'react';
import { Property } from '@/services/properties';
import PropertiesRow from './PropertiesRow';

interface PropertiesTableProps {
  properties: Property[];
}

const PropertiesTable: FC<PropertiesTableProps> = ({ properties }) => (
  <TableContainer>
    <Table>
      <Thead>
        <Tr>
          <Th>Наименование</Th>
          <Th>Действия</Th>
        </Tr>
      </Thead>
      <Tbody>
        {properties.map((property) => (
          <PropertiesRow key={property.id} property={property} />
        ))}
      </Tbody>
    </Table>
  </TableContainer>
);

export default PropertiesTable;
