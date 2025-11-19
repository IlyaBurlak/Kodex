import { createSelector } from '@reduxjs/toolkit';
import { RootState } from '../../store/store';
import { SearchItem } from '../../types/word';
import { FavoriteEntry } from '../dictionarySlice';

export const selectFavoritesItems = createSelector(
  [
    (state: RootState) => state.dictionary.favorites,
    (state: RootState) => state.dictionary.wordCache,
  ],
  (favorites, cache): SearchItem[] =>
    favorites.map((fav: FavoriteEntry) => {
      const uuid = fav.uuid;

      if (fav.data) {
        return {
          word: fav.data.word,
          fl: fav.data.fl,
          shortdef: fav.data.shortdef,
          meta: fav.data.meta,
        };
      }

      const found = Object.values(cache).find(
        (cacheEntry) => (cacheEntry as SearchItem)?.meta?.uuid === uuid
      ) as SearchItem | undefined;

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
    })
);

export const selectBaseList = createSelector(
  [
    (state: RootState) => state.dictionary.searchResults,
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
