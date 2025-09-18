import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface FavoritesState {
  words: string[];
}

const initialState: FavoritesState = {
  words: [],
};

const favoritesSlice = createSlice({
  name: 'favorites',
  initialState,
  reducers: {
    toggleFavorite(state, action: PayloadAction<string>) {
      const w = action.payload;
      const exists = state.words.includes(w);
      state.words = exists ? state.words.filter((x) => x !== w) : [...state.words, w];
    },
    removeFavorite(state, action: PayloadAction<string>) {
      state.words = state.words.filter((x) => x !== action.payload);
    },
    clearFavorites(state) {
      state.words = [];
    },
  },
});

export const { toggleFavorite, removeFavorite, clearFavorites } = favoritesSlice.actions;
export const favoritesReducer = favoritesSlice.reducer;
