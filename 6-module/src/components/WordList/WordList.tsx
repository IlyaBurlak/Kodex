import { useEffect } from 'react';
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
    const favItems: SearchItem[] = favs.map((word) => cache[word] ?? { word });
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

  useEffect(() => {
    if (!onlyFavorites || q) return;
    const missing = favs.filter((w) => !cache[w]);
    missing.forEach((w) => dispatch(fetchWordDetails(w)));
  }, [onlyFavorites, q, favs, cache, dispatch]);

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
        <WordListItem key={i.word} item={i} />
      ))}
    </ul>
  );
}
