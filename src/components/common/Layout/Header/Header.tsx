import { FC, useState } from 'react';
import { Button, Heading, HStack } from '@chakra-ui/react';
import { useAuth } from '@/context/auth';

interface HeaderProps {
  title?: string;
}

const Header: FC<HeaderProps> = ({ title }) => {
  const { logout } = useAuth();
  const [isLoading, setLoading] = useState(false);

  const onLogoutClick = async () => {
    setLoading(true);
    await logout();
    setLoading(false);
  };

  return (
    <HStack
      as="header"
      justifyContent="space-between"
      height="100%"
    >
      <Heading size="md">{title}</Heading>

      <Button
        isLoading={isLoading}
        colorScheme="red"
        onClick={onLogoutClick}
      >
        Выйти
      </Button>
    </HStack>
  );
};

export default Header;
