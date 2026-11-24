import { Navigate, useLocation } from 'react-router-dom';

import { selectUserSlice } from '../../services/selectors';
import { useSelector } from '../../services/store';

import type { ReactNode } from 'react';

type ProtectedRouteProps = {
  onlyUnAuth?: boolean;
  children: ReactNode;
};

export const ProtectedRoute = ({
  onlyUnAuth,
  children,
}: ProtectedRouteProps): React.JSX.Element => {
  const location = useLocation();
  const { isAuthChecked, user } = useSelector(selectUserSlice);

  if (!isAuthChecked) {
    return <div>Загрузка...</div>;
  }

  if (onlyUnAuth && user) {
    const from = (location.state as { from?: { pathname: string } })?.from ?? {
      pathname: '/',
    };
    return <Navigate to={from.pathname} replace />;
  }

  if (!onlyUnAuth && !user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return <>{children}</>;
};
