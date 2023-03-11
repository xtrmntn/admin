import { FC, FormEvent, useState } from 'react';
import {
  Button,
  Center, Container, FormControl, FormLabel, Input, Stack,
} from '@chakra-ui/react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '@/context/auth';

const Login: FC = () => {
  const { isAuth, login } = useAuth();
  const [isLoading, setLoading] = useState(false);

  if (isAuth) {
    return <Navigate to="/products" replace />;
  }

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    const data = new FormData(e.currentTarget);
    await login({
      login: data.get('login') as string,
      password: data.get('password') as string,
    });
    setLoading(false);
  };

  return (
    <Center
      minHeight="100vh"
      paddingBottom="15vh"
    >
      <Container
        backgroundColor="white"
        padding="30px"
        borderRadius={15}
      >
        <form onSubmit={onSubmit}>
          <Stack gap="20px">
            <FormControl isRequired>
              <FormLabel>Логин</FormLabel>
              <Input name="login" />
            </FormControl>

            <FormControl isRequired>
              <FormLabel>Пароль</FormLabel>
              <Input type="password" name="password" />
            </FormControl>

            <Button type="submit" isLoading={isLoading}>
              Войти
            </Button>
          </Stack>
        </form>
      </Container>
    </Center>
  );
};

export default Login;
