import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { MERRIAM_API_KEY, MERRIAM_BASE_URL } from '../../config';

export type PartOfSpeech = string;

export interface SearchItem {
  word: string;
  fl?: PartOfSpeech;
  phonetic?: string;
  shortdef?: string[];
}

export interface SearchState {
  query: string;
  items: SearchItem[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error?: string;
}

const initialState: SearchState = {
  query: '',
  items: [],
  status: 'idle',
};

export const fetchSuggestions = createAsyncThunk<SearchItem[], string>(
  'search/fetchSuggestions',
  async (query: string) => {
    const url = `${MERRIAM_BASE_URL}/${encodeURIComponent(query)}?key=${MERRIAM_API_KEY}`;
    const response = await fetch(url);
    if (!response.ok) throw new Error('Failed to fetch');
    const data = await response.json();
    console.log('[MW] suggestions raw response for query=', query, data);

    const mapped: SearchItem[] = (data as any[])
      .filter((e) => typeof e === 'object' && typeof e?.meta?.id === 'string')
      .map((e) => {
        const word: string = String(e.meta.id).split(':')[0] ?? '';
        const fl: PartOfSpeech | undefined = typeof e.fl === 'string' ? e.fl : undefined;
        const phonetic: string | undefined = Array.isArray(e.hwi?.prs)
          ? e.hwi.prs[0]?.mw
          : undefined;
        const shortdef: string[] | undefined = Array.isArray(e.shortdef)
          ? (e.shortdef as string[])
          : undefined;
        return { word, fl, phonetic, shortdef } as SearchItem;
      })
      .filter((i) => i.word.length > 0)
      .sort((a, b) => a.word.localeCompare(b.word))
      .slice(0, 10);

    return mapped;
  }
);

const searchSlice = createSlice({
  name: 'search',
  initialState,
  reducers: {
    setQuery(state, action: PayloadAction<string>) {
      state.query = action.payload;
    },
    clear(state) {
      state.items = [];
      state.status = 'idle';
      state.error = undefined;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchSuggestions.pending, (state) => {
        state.status = 'loading';
        state.error = undefined;
      })
      .addCase(fetchSuggestions.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.items = action.payload;
      })
      .addCase(fetchSuggestions.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export const { setQuery, clear } = searchSlice.actions;
export const searchReducer = searchSlice.reducer;
