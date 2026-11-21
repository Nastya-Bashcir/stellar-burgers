import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { orderBurgerApi } from '../utils/burger-api';
import type { TOrder } from '../utils/types';

interface OrderState {
  orderModalData: TOrder | null;
  orderRequest: boolean;
  orderFailed: boolean;
}

const initialState: OrderState = {
  orderModalData: null,
  orderRequest: false,
  orderFailed: false,
};

export const orderBurger = createAsyncThunk(
  'order/orderBurger',
  async (ingredients: string[], { rejectWithValue }) => {
    try {
      const response = await orderBurgerApi(ingredients);
      return response.order;
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : 'Неизвестная ошибка';
      return rejectWithValue(message);
    }
  }
);

export const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {
    resetOrder: (state) => {
      state.orderModalData = null;
      state.orderRequest = false;
      state.orderFailed = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(orderBurger.pending, (state) => {
        state.orderRequest = true;
        state.orderFailed = false;
      })
      .addCase(orderBurger.fulfilled, (state, action) => {
        state.orderRequest = false;
        state.orderModalData = action.payload;
      })
      .addCase(orderBurger.rejected, (state) => {
        state.orderRequest = false;
        state.orderFailed = true;
      });
  },
});

export const { resetOrder } = orderSlice.actions;
export default orderSlice.reducer;