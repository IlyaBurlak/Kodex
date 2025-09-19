import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { WordItem } from '../../types/word';
import { fetchWordDetailsFromApi } from './api/merriamWebsterApi';

export interface WordCacheState {
  byWord: Record<string, WordItem | undefined>;
}

const initialState: WordCacheState = {
  byWord: {},
};

export const fetchWordDetails = createAsyncThunk<WordItem | undefined, string>(
  'wordCache/fetchWordDetails',
  async (word: string) => {
    return fetchWordDetailsFromApi(word);
  }
);

const wordCacheSlice = createSlice({
  name: 'wordCache',
  initialState,
  reducers: {
    upsertWord(state, action: PayloadAction<WordItem>) {
      state.byWord[action.payload.word] = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchWordDetails.fulfilled, (state, action) => {
      const item = action.payload;
      if (item) state.byWord[item.word] = item;
    });
  },
});

export const { upsertWord } = wordCacheSlice.actions;
export const wordCacheReducer = wordCacheSlice.reducer;
