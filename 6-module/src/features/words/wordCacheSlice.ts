import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { MERRIAM_API_KEY, MERRIAM_BASE_URL } from '../../config';
import type { SearchItem } from '../search/searchSlice';

export interface WordCacheState {
  byWord: Record<string, SearchItem>;
}

const initialState: WordCacheState = {
  byWord: {},
};

export const fetchWordDetails = createAsyncThunk<SearchItem | undefined, string>(
  'wordCache/fetchWordDetails',
  async (word: string) => {
    const url = `${MERRIAM_BASE_URL}/${encodeURIComponent(word)}?key=${MERRIAM_API_KEY}`;
    const response = await fetch(url);
    if (!response.ok) throw new Error('Failed to fetch');
    const data = (await response.json()) as any[];
    // eslint-disable-next-line no-console
    console.log('[MW] word details raw response for word=', word, data);
    const entry = data.find((e) => typeof e === 'object' && typeof e?.meta?.id === 'string');
    if (!entry) return undefined;
    const mapped: SearchItem = {
      word: String(entry.meta.id).split(':')[0] ?? word,
      fl: typeof entry.fl === 'string' ? entry.fl : undefined,
      phonetic: Array.isArray(entry.hwi?.prs) ? entry.hwi.prs[0]?.mw : undefined,
      shortdef: Array.isArray(entry.shortdef) ? (entry.shortdef as string[]) : undefined,
    };
    return mapped;
  }
);

const wordCacheSlice = createSlice({
  name: 'wordCache',
  initialState,
  reducers: {
    upsertWord(state, action: PayloadAction<SearchItem>) {
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
