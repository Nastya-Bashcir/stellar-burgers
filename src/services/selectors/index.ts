import type { RootState } from '../store';

// Селекторы для ингредиентов
export const selectIngredientsSlice = (state: RootState): RootState['ingredients'] =>
  state.ingredients;

// Селекторы для пользователя
export const selectUserSlice = (state: RootState): RootState['user'] => state.user;

// Селекторы для конструктора
export const selectConstructorSlice = (
  state: RootState
): RootState['burgerConstructor'] => state.burgerConstructor;

// Селекторы для заказа
export const selectOrderSlice = (state: RootState): RootState['order'] => state.order;

// Селекторы для ленты
export const selectFeedSlice = (state: RootState): RootState['feed'] => state.feed;
