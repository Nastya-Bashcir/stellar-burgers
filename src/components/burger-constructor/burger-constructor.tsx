import { BurgerConstructorUI } from '@ui';
import { useMemo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import type { RootState, AppDispatch } from '../../services/store';
import { resetConstructor } from '../../services/constructorSlice';
import { orderBurger, resetOrder } from '../../services/orderSlice';
import { fetchFeeds } from '../../services/feedSlice';

import type { TConstructorIngredient } from '@utils-types';

export const BurgerConstructor = (): React.JSX.Element | null => {
  const constructorItems = useSelector((state: RootState) => state.burgerConstructor);
  const user = useSelector((state: RootState) => state.user.user);
  const { orderRequest, orderModalData } = useSelector((state: RootState) => state.order);
  
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const onOrderClick = (): void => {
    if (!constructorItems.bun || orderRequest) return;
    
    if (!user) {
      navigate('/login', { state: { from: { pathname: '/' } } });
      return;
    }

    const ingredients = [
      constructorItems.bun._id,
      constructorItems.bun._id,
      ...constructorItems.ingredients.map((item) => item._id),
    ];

    void dispatch(orderBurger(ingredients)).then((result) => {
      if (result.payload) {
        void dispatch(fetchFeeds());
      }
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