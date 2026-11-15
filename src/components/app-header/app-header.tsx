import { Link, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import type { RootState } from '../../services/store';
import {
  BurgerIcon,
  ListIcon,
  Logo,
  ProfileIcon,
} from '@krgaa/react-developer-burger-ui-components';

export const AppHeader = (): React.JSX.Element => {
  const userName = useSelector((state: RootState) => state.user.user?.name);
  const location = useLocation();

  const linkStyle = (isActive: boolean): React.CSSProperties => ({
    color: isActive ? '#fff' : '#8585ad',
    textDecoration: 'none',
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
  });

  return (
    <header style={{ display: 'flex', justifyContent: 'center', backgroundColor: '#1c1c21', padding: '16px 0' }}>
      <nav style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', maxWidth: '1280px', width: '100%', padding: '0 24px' }}>
        <div style={{ display: 'flex', gap: '24px' }}>
          <Link to="/" style={linkStyle(location.pathname === '/')}>
            <BurgerIcon type={location.pathname === '/' ? 'primary' : 'secondary'} />
            <span className="text text_type_main-default">Конструктор</span>
          </Link>
          <Link to="/feed" style={linkStyle(location.pathname === '/feed')}>
            <ListIcon type={location.pathname === '/feed' ? 'primary' : 'secondary'} />
            <span className="text text_type_main-default">Лента заказов</span>
          </Link>
        </div>
        <Link to="/" style={{ display: 'flex', alignItems: 'center' }}>
          <Logo className="" />
        </Link>
        <Link
          to={userName ? '/profile' : '/login'}
          style={linkStyle(location.pathname.startsWith('/profile'))}
        >
          <ProfileIcon type={location.pathname.startsWith('/profile') ? 'primary' : 'secondary'} />
          <span className="text text_type_main-default">
            {userName ?? 'Личный кабинет'}
          </span>
        </Link>
      </nav>
    </header>
  );
};