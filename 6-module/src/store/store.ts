import { configureStore, type ReducersMapObject } from '@reduxjs/toolkit';
import {
  initialState as dictionaryInitialState,
  dictionaryReducer,
  type DictionaryState,
} from '../features/dictionarySlice';

const FAVORITES_STORAGE_KEY = 'dictionary_favorites_v1';

function loadFavoritesFromStorage(): { uuid: string; word?: string }[] | undefined {
  try {
    const raw = localStorage.getItem(FAVORITES_STORAGE_KEY);
    if (!raw) return undefined;
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? (parsed as { uuid: string; word?: string }[]) : undefined;
  } catch {
    return undefined;
  }
}

const reducers: ReducersMapObject<{ dictionary: DictionaryState }> = {
  dictionary: dictionaryReducer,
};

export const store = configureStore({
  reducer: reducers,
  preloadedState: {
    dictionary: {
      ...dictionaryInitialState,
      favorites: loadFavoritesFromStorage() ?? [],
    },
  },
});

store.subscribe(() => {
  try {
    const state = store.getState();
    const favs = state.dictionary?.favorites ?? [];
    localStorage.setItem(FAVORITES_STORAGE_KEY, JSON.stringify(favs));
  } catch (err) {
    console.warn('Failed to persist favorites to localStorage', err);
  }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
