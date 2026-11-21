import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { TConstructorIngredient, TConstructorState } from '../utils/types';

const initialState: TConstructorState = {
  bun: null,
  ingredients: [],
};

export const constructorSlice = createSlice({
  name: 'constructor',
  initialState,
  reducers: {
    addIngredient: (state, action: PayloadAction<TConstructorIngredient>) => {
      const ingredient = action.payload;

      if (ingredient.type === 'bun') {
        // Булка заменяет предыдущую
        state.bun = ingredient;
      } else {
        // Остальные ингредиенты добавляются в конец
        state.ingredients.push(ingredient);
      }
    },

    removeIngredient: (state, action: PayloadAction<string>) => {
      const id = action.payload;
      state.ingredients = state.ingredients.filter((item) => item.id !== id);
    },

    moveIngredient: (state, action: PayloadAction<{ from: number; to: number }>) => {
      const { from, to } = action.payload;
      const [moved] = state.ingredients.splice(from, 1);
      state.ingredients.splice(to, 0, moved);
    },

    resetConstructor: (state) => {
      state.bun = null;
      state.ingredients = [];
    },
  },
});

export const { addIngredient, removeIngredient, moveIngredient, resetConstructor } = constructorSlice.actions;
export default constructorSlice.reducer;