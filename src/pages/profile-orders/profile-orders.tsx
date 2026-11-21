import { ProfileOrdersUI } from '@ui-pages';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import type { RootState, AppDispatch } from '../../services/store';
import { fetchUserOrders } from '../../services/profileOrdersSlice';

export const ProfileOrders = (): React.JSX.Element => {
  const orders = useSelector((state: RootState) => state.profileOrders.orders);
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    void dispatch(fetchUserOrders());
  }, [dispatch]);

  return <ProfileOrdersUI orders={orders} />;
};
