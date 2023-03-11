import { FC, PropsWithChildren } from 'react';
import { Link as RouterLink, LinkProps as RouterLinkProps } from 'react-router-dom';
import { Link as ChakraLink, LinkProps as ChakraLinkProps } from '@chakra-ui/react';

type LinkProps = RouterLinkProps & ChakraLinkProps;

const Link: FC<PropsWithChildren<LinkProps>> = ({ children, ...props }) => (
  <ChakraLink as={RouterLink} {...props}>
    {children}
  </ChakraLink>
);

export default Link;
