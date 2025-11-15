import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { MERRIAM_API_KEY, MERRIAM_BASE_URL } from '../../config';
import { initialState, PartOfSpeech, SearchItem } from '../../types/word';
import { MerriamWebsterEntry } from '../words/utils/types';

const buildMwUrl = (query: string) =>
  `${MERRIAM_BASE_URL}/${encodeURIComponent(query)}?key=${MERRIAM_API_KEY}`;

const isValidMwEntry = (entry: unknown): entry is MerriamWebsterEntry =>
  typeof entry === 'object' &&
  entry !== null &&
  typeof (entry as MerriamWebsterEntry).meta?.id === 'string';

const mapMwEntryToSearchItem = (entry: unknown): SearchItem | null => {
  if (!isValidMwEntry(entry)) return null;

  const rawEntry = entry as MerriamWebsterEntry;

  const rawId = String(rawEntry.meta?.id ?? '');
  const word = rawId.split(':')[0] ?? '';
  if (!word) return null;

  const fl: PartOfSpeech | undefined = typeof rawEntry.fl === 'string' ? rawEntry.fl : undefined;

  const prs = rawEntry.hwi?.prs;
  const phonetic: string | undefined =
    Array.isArray(prs) && prs.length > 0 && typeof prs[0]?.mw === 'string' ? prs[0]!.mw : undefined;

  const shortdef: string[] | undefined = Array.isArray(rawEntry.shortdef)
    ? rawEntry.shortdef
    : undefined;

  return {
    word,
    fl,
    phonetic,
    shortdef,
    meta: rawEntry.meta?.uuid ? { uuid: String(rawEntry.meta.uuid) } : undefined,
  } satisfies SearchItem;
};

export const fetchSuggestions = createAsyncThunk<SearchItem[], string>(
  'search/fetchSuggestions',
  async (query: string) => {
    const url = buildMwUrl(query);
    const response = await fetch(url);
    if (!response.ok) throw new Error(`Failed to fetch: ${response.status}`);
    const data = await response.json();
    const items: SearchItem[] = (Array.isArray(data) ? data : [])
      .map(mapMwEntryToSearchItem)
      .filter((it): it is SearchItem => it !== null)
      .sort((a, b) => a.word.localeCompare(b.word))
      .slice(0, 10);

    return items;
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
