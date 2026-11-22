import { RegisterUI } from '@ui-pages';
import { type SyntheticEvent, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { selectUserSlice } from '../../services/selectors';
import { registerUser } from '../../services/userSlice';

import type { AppDispatch } from '../../services/store';

export const Register = (): React.JSX.Element => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const { error } = useSelector(selectUserSlice);

  const handleSubmit = (e: SyntheticEvent): void => {
    e.preventDefault();
    void dispatch(registerUser({ name, email, password }))
      .unwrap()
      .then(() => {
        void navigate('/', { replace: true });
      })
      .catch((error: unknown) => {
        const message = error instanceof Error ? error.message : 'Ошибка регистрации';
        console.error('Ошибка регистрации:', message);
      });
  };

  return (
    <RegisterUI
      errorText={error?.message ?? ''}
      userName={name}
      setUserName={setName}
      email={email}
      setEmail={setEmail}
      password={password}
      setPassword={setPassword}
      handleSubmit={handleSubmit}
    />
  );
};
