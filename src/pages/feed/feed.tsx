import { Preloader } from '@ui';
import { FeedUI } from '@ui-pages';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { fetchFeeds } from '../../services/feedSlice';
import { selectFeedSlice } from '../../services/selectors';

import type { AppDispatch } from '../../services/store';

export const Feed = (): React.JSX.Element => {
  const { orders, isLoading } = useSelector(selectFeedSlice);
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

  return <FeedUI orders={orders} handleGetFeeds={handleGetFeeds} />;
};
