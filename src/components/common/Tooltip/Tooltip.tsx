import { FC, PropsWithChildren } from 'react';
import { Tooltip as ChakraTooltip, TooltipProps } from '@chakra-ui/react';

const Tooltip: FC<PropsWithChildren<TooltipProps>> = ({ children, ...props }) => (
  <ChakraTooltip
    hasArrow
    placement="top"
    {...props}
  >
    {children}
  </ChakraTooltip>
);

export default Tooltip;
