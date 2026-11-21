import type { RootState } from '../store';

// Селекторы для ингредиентов
export const selectIngredients = (state: RootState) => state.ingredients.ingredients;
export const selectIngredientsLoading = (state: RootState) => state.ingredients.isLoading;
export const selectIngredientsError = (state: RootState) => state.ingredients.error;

// Селекторы для пользователя
export const selectUser = (state: RootState) => state.user.user;
export const selectIsAuthChecked = (state: RootState) => state.user.isAuthChecked;
export const selectUserError = (state: RootState) => state.user.error;

// Селекторы для конструктора
export const selectConstructorItems = (state: RootState) => state.burgerConstructor;

// Селекторы для заказа
export const selectOrderRequest = (state: RootState) => state.order.orderRequest;
export const selectOrderModalData = (state: RootState) => state.order.orderModalData;

// Селекторы для ленты
export const selectFeedOrders = (state: RootState) => state.feed.orders;
export const selectFeedTotal = (state: RootState) => state.feed.total;
export const selectFeedTotalToday = (state: RootState) => state.feed.totalToday;