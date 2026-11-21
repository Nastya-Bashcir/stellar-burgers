import { Preloader } from '@ui';
import { FeedUI } from '@ui-pages';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import type { RootState, AppDispatch } from '../../services/store';
import { fetchFeeds } from '../../services/feedSlice';

export const Feed = (): React.JSX.Element => {
  const { orders, isLoading } = useSelector((state: RootState) => state.feed);
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    void dispatch(fetchFeeds());
  }, [dispatch]);

  const handleGetFeeds = (): void => {
    void dispatch(fetchFeeds());
  };

  if (isLoading && !orders.length) {
    return <Preloader />;
  }

  return (
    <FeedUI
      orders={orders}
      handleGetFeeds={handleGetFeeds}
    />
  );
};