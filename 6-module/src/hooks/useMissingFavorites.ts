import { useEffect, useRef } from 'react';
import { getMissingWordsToFetch } from '../components/WordList/utils/wordListUtils';
import { fetchWordDetails } from '../features/searchThunks';
import { useAppDispatch, useAppSelector } from './hooks';

export function useMissingFavorites(onlyFavorites: boolean, query: string) {
  const dispatch = useAppDispatch();

  const { favorites, wordCache, searchResults } = useAppSelector((state) => state.dictionary);

  const requestedWords = useRef<Set<string>>(new Set());

  useEffect(() => {
    if (!onlyFavorites || query) return;

    const missingWords = getMissingWordsToFetch(
      favorites,
      wordCache,
      searchResults,
      requestedWords.current
    );

    missingWords.forEach((word) => {
      requestedWords.current.add(word);
      dispatch(fetchWordDetails(word));
    });
  }, [onlyFavorites, query, favorites, wordCache, dispatch, searchResults]);
}
