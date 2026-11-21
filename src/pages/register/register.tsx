import { RegisterUI } from '@ui-pages';
import { type SyntheticEvent, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { registerUser } from '../../services/userSlice';
import type { RootState, AppDispatch } from '../../services/store';

export const Register = (): React.JSX.Element => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  
  const error = useSelector((state: RootState) => state.user.error);

  const handleSubmit = (e: SyntheticEvent): void => {
    e.preventDefault();
    void dispatch(registerUser({ name, email, password }))
      .unwrap()
      .then(() => {
        navigate('/', { replace: true });
      });
  };

  return (
    <RegisterUI
      errorText={error?.message || ''}
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