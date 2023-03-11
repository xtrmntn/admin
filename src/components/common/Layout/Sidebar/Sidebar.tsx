import { FC } from 'react';
import { IconType } from 'react-icons';
import { Stack } from '@chakra-ui/react';
import MenuItem from './MenuItem';

interface SidebarProps {
  items: {
    text: string;
    link: string;
    icon: IconType;
  }[];
  active?: string;
}

const Sidebar: FC<SidebarProps> = ({ items, active }) => (
  <Stack
    position="sticky"
    top="20px"
  >
    {items.map((item) => (
      <MenuItem
        key={item.link}
        item={item}
        isActive={active === item.text}
      />
    ))}
  </Stack>
);

export default Sidebar;
