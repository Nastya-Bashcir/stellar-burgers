import type { ReactNode } from 'react';
import { useSelector } from 'react-redux';
import { Navigate, useLocation } from 'react-router-dom';
import type { RootState } from '../../services/store';

type ProtectedRouteProps = {
  onlyUnAuth?: boolean;
  children: ReactNode;
};

export const ProtectedRoute = ({
  onlyUnAuth,
  children,
}: ProtectedRouteProps): React.JSX.Element => {
  const location = useLocation();
  const isAuthChecked = useSelector((state: RootState) => state.user.isAuthChecked);
  const user = useSelector((state: RootState) => state.user.user);

  if (!isAuthChecked) {
    return <div>Загрузка...</div>;
  }

  if (onlyUnAuth && user) {
    const from = (location.state as { from?: { pathname: string } })?.from ?? { pathname: '/' };
    return <Navigate to={from.pathname} replace />;
  }

  if (!onlyUnAuth && !user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return <>{children}</>;
};