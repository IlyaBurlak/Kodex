import { configureStore } from '@reduxjs/toolkit';
import { favoritesReducer } from '../features/favorites/favoritesSlice';
import { searchReducer } from '../features/search/searchSlice';
import { wordCacheReducer } from '../features/words/wordCacheSlice';

const FAVORITES_STORAGE_KEY = 'dictionary_favorites_v1';

function loadFavoritesFromStorage(): string[] | undefined {
  try {
    const raw = localStorage.getItem(FAVORITES_STORAGE_KEY);
    if (!raw) return undefined;
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? (parsed as string[]) : undefined;
  } catch {
    return undefined;
  }
}

export const store = configureStore({
  reducer: {
    search: searchReducer,
    favorites: favoritesReducer,
    wordCache: wordCacheReducer,
  },
  preloadedState: {
    favorites: {
      words: loadFavoritesFromStorage() ?? [],
    },
  },
});

store.subscribe(() => {
  try {
    const state = store.getState();
    const words = state.favorites.words;
    localStorage.setItem(FAVORITES_STORAGE_KEY, JSON.stringify(words));
  } catch (e) {
    console.warn('Failed to persist favorites to localStorage', e);
  }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
