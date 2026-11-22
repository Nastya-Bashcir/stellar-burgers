import { FeedInfoUI } from '@ui';
import { useMemo } from 'react';
import { useSelector } from 'react-redux';

import { selectFeedSlice } from '../../services/selectors';

import type { TOrder } from '@utils-types';

const getOrders = (orders: TOrder[], status: string): number[] =>
  orders
    .filter((item) => item.status === status)
    .map((item) => item.number)
    .slice(0, 20);

export const FeedInfo = (): React.JSX.Element => {
  const feed = useSelector(selectFeedSlice);
  const orders = feed.orders;

  const { readyOrders, pendingOrders } = useMemo(
    () => ({
      readyOrders: getOrders(orders, 'done'),
      pendingOrders: getOrders(orders, 'pending'),
    }),
    [orders]
  );

  return (
    <FeedInfoUI readyOrders={readyOrders} pendingOrders={pendingOrders} feed={feed} />
  );
};
