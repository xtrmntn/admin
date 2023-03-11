import { FC } from 'react';
import { Center, Spinner } from '@chakra-ui/react';

const Loader: FC = () => (
  <Center minHeight="100vh" paddingBottom="15vh">
    <Spinner />
  </Center>
);

export default Loader;
