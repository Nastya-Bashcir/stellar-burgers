import { RegisterUI } from '@ui-pages';
import { type SyntheticEvent, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { registerUser } from '../../services/userSlice';
import type { AppDispatch } from '../../services/store';

export const Register = (): React.JSX.Element => {
  const [userName, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const handleSubmit = (e: SyntheticEvent): void => {
    e.preventDefault();
    void dispatch(registerUser({ email, password, name: userName }))
      .unwrap()
      .then(() => { navigate('/', { replace: true }); })
      .catch((error: unknown) => {
        const message = error instanceof Error ? error.message : 'Ошибка регистрации';
        console.error('Ошибка регистрации:', message);
      });
  };

  return (
    <RegisterUI
      errorText=""
      email={email}
      userName={userName}
      password={password}
      setEmail={setEmail}
      setPassword={setPassword}
      setUserName={setUserName}
      handleSubmit={handleSubmit}
    />
  );
};