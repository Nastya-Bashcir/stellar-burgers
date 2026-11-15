import { Preloader, OrderInfoUI } from '@ui';
import { useMemo } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import type { RootState } from '../../services/store';
import type { TOrder, TIngredient } from '@utils-types';
import { getOrderByNumberApi } from '../../utils/burger-api';
import { useState, useEffect } from 'react';

export const OrderInfo = (): React.JSX.Element => {
  const { number } = useParams<{ number: string }>();
  const ingredients = useSelector((state: RootState) => state.ingredients.ingredients);
  const [orderData, setOrderData] = useState<TOrder | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (number) {
      setIsLoading(true);
      getOrderByNumberApi(Number(number))
        .then((response) => {
          if (response.orders && response.orders.length > 0) {
            setOrderData(response.orders[0]);
          }
        })
        .catch((error) => {
          console.error('Ошибка загрузки заказа:', error);
        })
        .finally(() => {
          setIsLoading(false);
        });
    }
  }, [number]);

  const orderInfo = useMemo(() => {
    if (!orderData || !ingredients.length) return null;

    const date = new Date(orderData.createdAt);

    type TIngredientsWithCount = Record<string, TIngredient & { count: number }>;

    const ingredientsInfo = orderData.ingredients.reduce(
      (acc: TIngredientsWithCount, item) => {
        if (!acc[item]) {
          const ingredient = ingredients.find((ing) => ing._id === item);
          if (ingredient) {
            acc[item] = {
              ...ingredient,
              count: 1,
            };
          }
        } else {
          acc[item].count++;
        }
        return acc;
      },
      {}
    );

    const total = Object.values(ingredientsInfo).reduce(
      (acc, item) => acc + item.price * item.count,
      0
    );

    return {
      ...orderData,
      ingredientsInfo,
      date,
      total,
    };
  }, [orderData, ingredients]);

  if (isLoading) {
    return <Preloader />;
  }

  if (!orderInfo) {
    return <p className="text text_type_main-medium">Заказ не найден</p>;
  }

  return <OrderInfoUI orderInfo={orderInfo} />;
};