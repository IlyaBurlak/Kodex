import { createSelector } from '@reduxjs/toolkit';
import { RootState } from '../../store/store';
import { SearchItem } from '../../types/word';
import { FavoriteEntry } from '../dictionarySlice';

const selectFavorites = (state: RootState) => state.dictionary.favorites;
const selectWordCache = (state: RootState) => state.dictionary.wordCache;
const selectSearchResults = (state: RootState) => state.dictionary.searchResults;

export const selectFavoritesItems = createSelector(
  [selectFavorites, selectWordCache],
  (favs, cache): SearchItem[] => {
    return favs.map((fav: FavoriteEntry) => {
      const uuid = fav.uuid;

      if (fav.data) {
        return {
          word: fav.data.word,
          fl: fav.data.fl,
          shortdef: fav.data.shortdef,
          meta: fav.data.meta,
        };
      }

      const found = Object.values(cache).find((cacheEntry) => cacheEntry?.meta?.uuid === uuid);

      if (found) {
        return {
          word: found.word,
          fl: found.fl,
          shortdef: found.shortdef,
          meta: found.meta,
        };
      }

      const word = fav.word ?? '';
      return { word, meta: { uuid } };
    });
  }
);

export const selectBaseList = createSelector(
  [
    selectSearchResults,
    selectFavoritesItems,
    (_state: RootState, onlyFavorites: boolean, query: string) => ({ onlyFavorites, query }),
  ],
  (searchResults, favoritesItems, { onlyFavorites, query }): SearchItem[] => {
    if (!onlyFavorites) {
      return searchResults;
    }

    if (!query) {
      return favoritesItems;
    }

    const queryLower = query.toLowerCase();
    return favoritesItems.filter((item) => {
      if (item.word.toLowerCase().includes(queryLower)) return true;
      if (Array.isArray(item.shortdef)) {
        return item.shortdef.join(' ').toLowerCase().includes(queryLower);
      }
      return false;
    });
  }
);

export const selectItemsByPartOfSpeech = createSelector(
  [
    (_state: RootState, baseList: SearchItem[]) => baseList,
    (_state: RootState, _baseList: SearchItem[], selectedPos: string[]) => selectedPos,
  ],
  (baseList, selectedPos): SearchItem[] => {
    if (selectedPos.length === 0) {
      return baseList;
    }

    return baseList.filter((item) => {
      const part = (item.fl ?? '').toLowerCase();
      return selectedPos.includes(part);
    });
  }
);
