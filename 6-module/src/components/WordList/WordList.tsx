import { useEffect, useRef } from 'react';
import { useSearchParams } from 'react-router-dom';
import { fetchWordDetails } from '../../features/words/wordCacheSlice';
import { useAppDispatch, useAppSelector } from '../../hooks/hooks';
import { SearchItem } from '../../types/word';
import { WordListItem } from '../WordListItem/WordListItem';

export function WordList({ onlyFavorites = false }: { onlyFavorites?: boolean }) {
  const dispatch = useAppDispatch();
  const items = useAppSelector((s) => s.search.items);
  const favs = useAppSelector((s) => s.favorites.words);
  const cache = useAppSelector((s) => s.wordCache.byWord);
  const [params] = useSearchParams();
  const q = params.get('q') ?? '';
  const posParam = onlyFavorites ? (params.get('pos') ?? '') : '';
  const selectedPos = onlyFavorites
    ? posParam
        .split(',')
        .map((s) => s.trim().toLowerCase())
        .filter(Boolean)
    : [];

  let baseList: SearchItem[] = items;
  if (onlyFavorites) {
    const favItems: SearchItem[] = favs.map((fav) => {
      const uuid = (fav as any).uuid;
      if ((fav as any).data) return (fav as any).data as SearchItem;
      const found = Object.values(cache).find((v) => v?.meta?.uuid === uuid);
      if (found) return found as SearchItem;
      const word = (fav as any).word ?? '';
      return { word, meta: { uuid } } as unknown as SearchItem;
    });
    if (q) {
      const qq = q.toLowerCase();
      baseList = favItems.filter((item) => {
        if (item.word.toLowerCase().includes(qq)) return true;
        if (Array.isArray(item.shortdef)) {
          return item.shortdef.join(' ').toLowerCase().includes(qq);
        }
        return false;
      });
    } else {
      baseList = favItems;
    }
  }

  const requestedWordsRef = useRef<Set<string>>(new Set());

  useEffect(() => {
    if (!onlyFavorites || q) return;
    const requestedRef = requestedWordsRef.current;
    const missing = (favs as any[]).filter(
      (f) => !Object.values(cache).some((v) => v?.meta?.uuid === f.uuid)
    );
    missing.forEach((f) => {
      const preferredWord = f.word ?? items.find((it) => (it as any).meta?.uuid === f.uuid)?.word;
      if (!preferredWord) return;
      if (requestedRef.has(preferredWord)) return;
      if (cache[preferredWord]) return;
      requestedRef.add(preferredWord);
      dispatch(fetchWordDetails(preferredWord));
    });
  }, [onlyFavorites, q, favs, cache, dispatch, items]);

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
      {sorted.map((i) => (
        <WordListItem key={(i as any).meta.uuid} item={i} />
      ))}
    </ul>
  );
}
