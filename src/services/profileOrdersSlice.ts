import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getOrdersApi } from '../utils/burger-api';
import type { TOrder } from '../utils/types';

interface ProfileOrdersState {
  orders: TOrder[];
  isLoading: boolean;
}

const initialState: ProfileOrdersState = {
  orders: [],
  isLoading: false,
};

export const fetchUserOrders = createAsyncThunk(
  'profileOrders/fetchUserOrders',
  async (_, { rejectWithValue }) => {
    try {
      const response = await getOrdersApi();
      return response;
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : 'Неизвестная ошибка';
      return rejectWithValue(message);
    }
  }
);

export const profileOrdersSlice = createSlice({
  name: 'profileOrders',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserOrders.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchUserOrders.fulfilled, (state, action) => {
        state.isLoading = false;
        state.orders = action.payload;
      })
      .addCase(fetchUserOrders.rejected, (state) => {
        state.isLoading = false;
      });
  },
});

export default profileOrdersSlice.reducer;