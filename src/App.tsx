import { FC } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from 'react-query';
import { IconContext } from 'react-icons';
import { ChakraProvider } from '@chakra-ui/react';
import { theme } from '@/core/theme';
import { AuthProvider } from '@/context/auth';
import { toastErrorMessage } from '@/utils/error';
import Router from '@/components/common/Router';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      onError: toastErrorMessage,
    },
    mutations: {
      onError: toastErrorMessage,
    },
  },
});

const iconProps = { size: '20px' };

const App: FC = () => (
  <BrowserRouter>
    <QueryClientProvider client={queryClient}>
      <ChakraProvider theme={theme}>
        <IconContext.Provider value={iconProps}>
          <AuthProvider>
            <Router />
          </AuthProvider>
        </IconContext.Provider>
      </ChakraProvider>
    </QueryClientProvider>
  </BrowserRouter>
);

export default App;
