import { BurgerConstructorUI } from '@ui';
import { useMemo } from 'react';
import { useNavigate } from 'react-router-dom';

import { resetConstructor } from '../../services/constructorSlice';
import { fetchFeeds } from '../../services/feedSlice';
import { orderBurger, resetOrder } from '../../services/orderSlice';
import {
  selectConstructorSlice,
  selectUserSlice,
  selectOrderSlice,
} from '../../services/selectors';
import { useSelector, useDispatch } from '../../services/store';

import type { TConstructorIngredient } from '@utils-types';

export const BurgerConstructor = (): React.JSX.Element | null => {
  const constructorItems = useSelector(selectConstructorSlice);
  const user = useSelector(selectUserSlice);
  const { orderRequest, orderModalData } = useSelector(selectOrderSlice);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onOrderClick = (): void => {
    if (!constructorItems.bun || orderRequest) return;

    if (!user) {
      void navigate('/login', { state: { from: { pathname: '/' } } });
      return;
    }

    const ingredients = [
      constructorItems.bun._id,
      constructorItems.bun._id,
      ...constructorItems.ingredients.map((item) => item._id),
    ];

    void dispatch(orderBurger(ingredients))
      .unwrap()
      .then(() => {
        void dispatch(fetchFeeds());
      })
      .catch((error: unknown) => {
        const message =
          error instanceof Error ? error.message : 'Ошибка оформления заказа';
        console.error('Ошибка оформления заказа:', message);
      });
  };

  const closeOrderModal = (): void => {
    dispatch(resetOrder());
    dispatch(resetConstructor());
  };

  const price = useMemo(
    () =>
      (constructorItems.bun ? constructorItems.bun.price * 2 : 0) +
      constructorItems.ingredients.reduce(
        (s: number, v: TConstructorIngredient) => s + v.price,
        0
      ),
    [constructorItems]
  );

  return (
    <BurgerConstructorUI
      price={price}
      orderRequest={orderRequest}
      constructorItems={constructorItems}
      orderModalData={orderModalData}
      onOrderClick={onOrderClick}
      closeOrderModal={closeOrderModal}
    />
  );
};
