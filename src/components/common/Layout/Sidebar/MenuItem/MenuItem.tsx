import { createElement, FC } from 'react';
import { Link } from 'react-router-dom';
import { IconType } from 'react-icons';
import {
  Center, HStack, Text, theme,
} from '@chakra-ui/react';

interface MenuItemProps {
  item: {
    text: string;
    link: string;
    icon: IconType;
  };
  isActive: boolean;
}

const MenuItem: FC<MenuItemProps> = ({ item, isActive }) => (
  <Link to={item.link}>
    <HStack
      borderRadius={15}
      padding="10px"
      gap="5px"
      {...isActive && { backgroundColor: 'white' }}
    >
      <Center
        width="30px"
        height="30px"
        borderRadius={12}
        backgroundColor={isActive ? theme.colors.whatsapp['500'] : 'white'}
      >
        {createElement(item.icon, {
          color: isActive ? 'white' : theme.colors.whatsapp['500'],
          size: '1em',
        })}
      </Center>

      <Text
        color="gray.400"
        fontWeight="700"
        {...isActive && { color: 'black' }}
      >
        {item.text}
      </Text>
    </HStack>
  </Link>
);

export default MenuItem;
