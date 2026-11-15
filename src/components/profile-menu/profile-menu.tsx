import { ProfileMenuUI } from '@ui';
import { useLocation, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import type { AppDispatch } from '../../services/store';
import { logoutUser } from '../../services/userSlice';

export const ProfileMenu = (): React.JSX.Element => {
  const { pathname } = useLocation();
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const handleLogout = (): void => {
    void dispatch(logoutUser())
      .unwrap()
      .then(() => { navigate('/', { replace: true }); })
      .catch((error: unknown) => {
        const message = error instanceof Error ? error.message : 'Ошибка выхода';
        console.error('Ошибка выхода:', message);
      });
  };

  return <ProfileMenuUI handleLogout={handleLogout} pathname={pathname} />;
};