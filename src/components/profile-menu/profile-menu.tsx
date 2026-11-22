import { ProfileMenuUI } from '@ui';
import { useDispatch } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';

import { logoutUser } from '../../services/userSlice';

import type { AppDispatch } from '../../services/store';

export const ProfileMenu = (): React.JSX.Element => {
  const { pathname } = useLocation();
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const handleLogout = (): void => {
    void dispatch(logoutUser())
      .unwrap()
      .then(() => {
        void navigate('/login', { replace: true });
      })
      .catch((error: unknown) => {
        const message = error instanceof Error ? error.message : 'Ошибка выхода';
        console.error('Ошибка выхода:', message);
      });
  };

  return <ProfileMenuUI handleLogout={handleLogout} pathname={pathname} />;
};
