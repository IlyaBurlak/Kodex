import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { SearchItem, WordItem } from '../types/word';
import { fetchSuggestions, fetchWordDetails } from './searchThunks';

export interface FavoriteEntry {
  uuid: string;
  word?: string;
  data?: WordItem;
}

export interface DictionaryState {
  query: string;
  searchStatus: 'idle' | 'loading' | 'succeeded' | 'failed';
  searchError?: string;
  searchResults: SearchItem[];

  favorites: FavoriteEntry[];

  wordCache: Record<string, WordItem | undefined>;
  loadingWords: Record<string, boolean>;
}

export const initialState: DictionaryState = {
  query: '',
  searchStatus: 'idle',
  searchError: undefined,
  searchResults: [],
  favorites: [],
  wordCache: {},
  loadingWords: {},
};

const dictionarySlice = createSlice({
  name: 'dictionary',
  initialState,
  reducers: {
    setQuery(state, action: PayloadAction<string>) {
      state.query = action.payload;
    },
    clearSearch(state) {
      state.searchResults = [];
      state.searchStatus = 'idle';
      state.searchError = undefined;
    },
    toggleFavorite(state, action: PayloadAction<FavoriteEntry>) {
      const entry = action.payload;
      const exists = state.favorites.some((existing) => existing.uuid === entry.uuid);
      state.favorites = exists
        ? state.favorites.filter((existing) => existing.uuid !== entry.uuid)
        : [...state.favorites, entry];
    },
    upsertWord(state, action: PayloadAction<WordItem>) {
      state.wordCache[action.payload.word] = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchSuggestions.pending, (state) => {
        state.searchStatus = 'loading';
        state.searchError = undefined;
      })
      .addCase(fetchSuggestions.fulfilled, (state, action) => {
        state.searchStatus = 'succeeded';
        state.searchResults = action.payload;
      })
      .addCase(fetchSuggestions.rejected, (state, action) => {
        state.searchStatus = 'failed';
        state.searchError = action.error.message;
      })
      .addCase(fetchWordDetails.pending, (state, action) => {
        const word = action.meta.arg;
        if (word) state.loadingWords[word] = true;
      })
      .addCase(fetchWordDetails.fulfilled, (state, action) => {
        const item = action.payload;
        const word = action.meta.arg;
        if (item) state.wordCache[item.word] = item;
        if (word) state.loadingWords[word] = false;
      })
      .addCase(fetchWordDetails.rejected, (state, action) => {
        const word = action.meta.arg as string | undefined;
        if (word) state.loadingWords[word] = false;
      });
  },
});

export const { setQuery, clearSearch, toggleFavorite, upsertWord } = dictionarySlice.actions;
export const dictionaryReducer = dictionarySlice.reducer;
