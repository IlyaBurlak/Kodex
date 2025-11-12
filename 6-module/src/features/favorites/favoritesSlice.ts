import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { WordItem } from '../../types/word';

export interface FavoriteEntry {
  uuid: string;
  word?: string;
  data?: WordItem;
}

export interface FavoritesState {
  words: FavoriteEntry[];
}

const initialState: FavoritesState = {
  words: [],
};

const favoritesSlice = createSlice({
  name: 'favorites',
  initialState,
  reducers: {
    toggleFavorite(state, action: PayloadAction<FavoriteEntry>) {
      const entry = action.payload;
      const exists = state.words.some((w) => w.uuid === entry.uuid);
      state.words = exists
        ? state.words.filter((x) => x.uuid !== entry.uuid)
        : [...state.words, entry];
    },
    removeFavorite(state, action: PayloadAction<string>) {
      state.words = state.words.filter((x) => x.uuid !== action.payload);
    },
    clearFavorites(state) {
      state.words = [];
    },
  },
});

export const { toggleFavorite, removeFavorite, clearFavorites } = favoritesSlice.actions;
export const favoritesReducer = favoritesSlice.reducer;
