import {
  createContext, FC, PropsWithChildren, useContext, useEffect, useState,
} from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { AuthCredentials } from '@/services/auth';
import * as api from '@/services/auth';
import { getMe } from '@/services/users';
import { storage } from '@/utils/storage';
import { toastErrorMessage } from '@/utils/error';
import { toast } from '@/utils/toast';
import Loader from '@/components/common/Loader';

type ContextValue = ReturnType<typeof useProvideAuth>;

const authContext = createContext<ContextValue | null>(null);

const useProvideAuth = () => {
  const [isAuth, setAuth] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const login = async (credentials: AuthCredentials) => {
    try {
      const { accessToken, refreshToken } = await api.login(credentials);
      toast({ description: 'Вы успешно авторизовались', status: 'success' });
      storage.set('accessToken', accessToken);
      storage.set('refreshToken', refreshToken);
      setAuth(true);
      navigate(location.state.from || '/');
    } catch (e) {
      toastErrorMessage(e);
    }
  };

  const logout = async () => {
    try {
      await api.logout();
    } catch (e) {
      toastErrorMessage(e);
    } finally {
      setAuth(false);
      storage.remove('accessToken');
      storage.remove('refreshToken');
    }
  };

  return {
    isAuth,
    setAuth,
    login,
    logout,
  };
};

export const AuthProvider: FC<PropsWithChildren> = ({ children }) => {
  const [isLoading, setLoading] = useState(true);
  const auth = useProvideAuth();

  useEffect(() => {
    getMe()
      .then(() => auth.setAuth(true))
      .finally(() => setLoading(false));
  }, []);

  if (isLoading) {
    return <Loader />;
  }

  return (
    <authContext.Provider value={auth}>
      {children}
    </authContext.Provider>
  );
};

export const useAuth = () => useContext(authContext) as ContextValue;
