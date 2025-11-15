import { useEffect, useRef } from 'react';
import { useSearchParams } from 'react-router-dom';
import { FavoriteEntry } from '../../features/favorites/favoritesSlice';
import { fetchWordDetails } from '../../features/words/wordCacheSlice';
import { useAppDispatch, useAppSelector } from '../../hooks/hooks';
import { SearchItem } from '../../types/word';
import { WordListItem } from '../WordListItem/WordListItem';

export function WordList({ onlyFavorites = false }: { onlyFavorites?: boolean }) {
  const dispatch = useAppDispatch();
  const items = useAppSelector((state) => state.search.items);
  const favs: FavoriteEntry[] = useAppSelector((state) => state.favorites.words);
  const cache = useAppSelector((state) => state.wordCache.byWord);
  const [params] = useSearchParams();
  const query = params.get('q') ?? '';
  const posParam = onlyFavorites ? (params.get('pos') ?? '') : '';
  const selectedPos = onlyFavorites
    ? posParam
        .split(',')
        .map((posStr) => posStr.trim().toLowerCase())
        .filter(Boolean)
    : [];

  let baseList: SearchItem[] = items;
  if (onlyFavorites) {
    const favItems: SearchItem[] = favs.map((fav) => {
      const uuid = fav.uuid;
      if (fav.data)
        return {
          word: fav.data.word,
          fl: fav.data.fl,
          shortdef: fav.data.shortdef,
          meta: fav.data.meta,
        } satisfies SearchItem;
      const found = Object.values(cache).find((cacheEntry) => cacheEntry?.meta?.uuid === uuid);
      if (found)
        return {
          word: found.word,
          fl: found.fl,
          shortdef: found.shortdef,
          meta: found.meta,
        } satisfies SearchItem;
      const word = fav.word ?? '';
      return { word, meta: { uuid } } satisfies SearchItem;
    });
    if (query) {
      const queryLower = query.toLowerCase();
      baseList = favItems.filter((item) => {
        if (item.word.toLowerCase().includes(queryLower)) return true;
        if (Array.isArray(item.shortdef)) {
          return item.shortdef.join(' ').toLowerCase().includes(queryLower);
        }
        return false;
      });
    } else {
      baseList = favItems;
    }
  }

  const requestedWordsRef = useRef<Set<string>>(new Set());

  useEffect(() => {
    if (!onlyFavorites || query) return;
    const requestedRef = requestedWordsRef.current;
    const missing = favs.filter(
      (favEntry) =>
        !Object.values(cache).some((cacheEntry) => cacheEntry?.meta?.uuid === favEntry.uuid)
    );
    missing.forEach((favEntry) => {
      const preferredWord =
        favEntry.word ?? items.find((listItem) => listItem.meta?.uuid === favEntry.uuid)?.word;
      if (!preferredWord) return;
      if (requestedRef.has(preferredWord)) return;
      if (cache[preferredWord]) return;
      requestedRef.add(preferredWord);
      dispatch(fetchWordDetails(preferredWord));
    });
  }, [onlyFavorites, query, favs, cache, dispatch, items]);

  let filtered: SearchItem[] = baseList;
  if (selectedPos.length > 0) {
    filtered = baseList.filter((item) => {
      const part = (item.fl ?? '').toLowerCase();
      return selectedPos.includes(part);
    });
  }

  const sorted = [...filtered].sort((a, b) => a.word.localeCompare(b.word));

  return (
    <ul className='word-list'>
      {sorted.map((item) => (
        <WordListItem key={item.meta?.uuid} item={item} />
      ))}
    </ul>
  );
}
