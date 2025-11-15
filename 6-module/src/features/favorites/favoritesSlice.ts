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
      const exists = state.words.some((existing) => existing.uuid === entry.uuid);
      state.words = exists
        ? state.words.filter((existing) => existing.uuid !== entry.uuid)
        : [...state.words, entry];
    },
  },
});

export const { toggleFavorite } = favoritesSlice.actions;
export const favoritesReducer = favoritesSlice.reducer;
