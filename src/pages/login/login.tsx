import { LoginUI } from '@ui-pages';
import { type SyntheticEvent, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate, useLocation } from 'react-router-dom';

import { selectUserSlice } from '../../services/selectors';
import { loginUser } from '../../services/userSlice';

import type { AppDispatch } from '../../services/store';

export const Login = (): React.JSX.Element => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const location = useLocation();
  const { error } = useSelector(selectUserSlice);

  const from =
    (location.state as { from?: { pathname: string } })?.from?.pathname ?? '/';

  const handleSubmit = (e: SyntheticEvent): void => {
    e.preventDefault();
    void dispatch(loginUser({ email, password }))
      .unwrap()
      .then(() => {
        void navigate(from, { replace: true });
      })
      .catch((error: unknown) => {
        const message = error instanceof Error ? error.message : 'Ошибка входа';
        console.error('Ошибка входа:', message);
      });
  };

  return (
    <LoginUI
      errorText={error?.message ?? ''}
      email={email}
      setEmail={setEmail}
      password={password}
      setPassword={setPassword}
      handleSubmit={handleSubmit}
    />
  );
};
