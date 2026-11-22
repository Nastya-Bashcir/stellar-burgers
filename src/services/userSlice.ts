import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import {
  loginUserApi,
  registerUserApi,
  getUserApi,
  logoutApi,
  updateUserApi,
} from '../utils/burger-api';
import { setCookie, deleteCookie } from '../utils/cookie';

import type { TUser } from '../utils/types';
import type { SerializedError } from '@reduxjs/toolkit';

type UserState = {
  user: TUser | null;
  isAuthChecked: boolean;
  error: SerializedError | null;
  updateLoading: boolean;
  updateError: string | null;
};

const initialState: UserState = {
  user: null,
  isAuthChecked: false,
  error: null,
  updateLoading: false,
  updateError: null,
};

export const loginUser = createAsyncThunk(
  'user/login',
  async (data: { email: string; password: string }) => {
    const response = await loginUserApi(data);
    setCookie('accessToken', response.accessToken);
    localStorage.setItem('refreshToken', response.refreshToken);
    return response.user;
  }
);

export const registerUser = createAsyncThunk(
  'user/register',
  async (data: { email: string; password: string; name: string }) => {
    const response = await registerUserApi(data);
    setCookie('accessToken', response.accessToken);
    localStorage.setItem('refreshToken', response.refreshToken);
    return response.user;
  }
);

export const getUser = createAsyncThunk(
  'user/getUser',
  async (_, { rejectWithValue }) => {
    try {
      const response = await getUserApi();
      return response.user;
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : 'Неизвестная ошибка';
      return rejectWithValue(message);
    }
  }
);

export const logoutUser = createAsyncThunk(
  'user/logout',
  async (_, { rejectWithValue }) => {
    try {
      await logoutApi();
      deleteCookie('accessToken');
      localStorage.removeItem('refreshToken');
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : 'Неизвестная ошибка';
      return rejectWithValue(message);
    }
  }
);

export const updateUser = createAsyncThunk(
  'user/updateUser',
  async (
    data: { name?: string; email?: string; password?: string },
    { rejectWithValue }
  ) => {
    try {
      const response = await updateUserApi(data);
      return response.user;
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : 'Неизвестная ошибка';
      return rejectWithValue(message);
    }
  }
);

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setAuthChecked: (state) => {
      state.isAuthChecked = true;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.user = action.payload;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.error = action.error;
      })
      .addCase(registerUser.pending, (state) => {
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.user = action.payload;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.error = action.error;
      })
      .addCase(getUser.pending, (state) => {
        state.error = null;
      })
      .addCase(getUser.fulfilled, (state, action) => {
        state.user = action.payload;
        state.isAuthChecked = true;
      })
      .addCase(getUser.rejected, (state, action) => {
        state.isAuthChecked = true;
        state.error = action.error;
      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.user = null;
        state.isAuthChecked = true;
      })
      .addCase(updateUser.pending, (state) => {
        state.updateLoading = true;
        state.updateError = null;
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.user = action.payload;
        state.updateLoading = false;
      })
      .addCase(updateUser.rejected, (state, action) => {
        state.updateLoading = false;
        state.updateError = action.payload as string;
      });
  },
});

export const { setAuthChecked } = userSlice.actions;

export default userSlice.reducer;
