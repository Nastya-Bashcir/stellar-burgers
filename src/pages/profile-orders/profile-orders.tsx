import { ProfileOrdersUI } from '@ui-pages';
import { useEffect } from 'react';

import { fetchUserOrders } from '../../services/profileOrdersSlice';
import { useDispatch, useSelector } from '../../services/store';

import type { RootState } from '../../services/store';

export const ProfileOrders = (): React.JSX.Element => {
  const orders = useSelector((state: RootState) => state.profileOrders.orders);
  const dispatch = useDispatch();

  useEffect(() => {
    void dispatch(fetchUserOrders());
  }, [dispatch]);

  return <ProfileOrdersUI orders={orders} />;
};
