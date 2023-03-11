import { ComponentType } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '@/context/auth';

export const withPrivate = <P extends object>(Component: ComponentType<P>) => (
  (props: P) => {
    const location = useLocation();
    const { isAuth } = useAuth();

    if (isAuth) {
      return <Component {...props} />;
    }

    return (
      <Navigate
        to="/login"
        state={{ from: location }}
        replace
      />
    );
  }
);
