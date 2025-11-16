import { useEffect, useRef } from 'react';
import { useSearchParams } from 'react-router-dom';
import { fetchWordDetails } from '../../features/searchThunks';
import {
  selectBaseList,
  selectItemsByPartOfSpeech,
} from '../../features/selectors/wordListSelectors';
import { useAppDispatch, useAppSelector } from '../../hooks/hooks';
import { WordListItem } from '../WordListItem/WordListItem';
import {
  getMissingWordsToFetch,
  getSelectedPosFromParams,
  sortItemsAlphabetically,
} from './utils/wordListUtils';

export type WordListProps = {
  onlyFavorites?: boolean;
};

export function WordList({ onlyFavorites = false }: WordListProps) {
  const dispatch = useAppDispatch();
  const [params] = useSearchParams();

  const query = params.get('q') ?? '';
  const posParam = onlyFavorites ? (params.get('pos') ?? '') : '';
  const selectedPos = onlyFavorites ? getSelectedPosFromParams(posParam) : [];

  const baseList = useAppSelector((state) => selectBaseList(state, onlyFavorites, query));
  const items = useAppSelector((state) => state.dictionary.searchResults);
  const cache = useAppSelector((state) => state.dictionary.wordCache);
  const favs = useAppSelector((state) => state.dictionary.favorites);

  const filtered = useAppSelector((state) =>
    selectItemsByPartOfSpeech(state, baseList, selectedPos)
  );

  const sorted = sortItemsAlphabetically(filtered);

  const requestedWordsRef = useRef<Set<string>>(new Set());

  useEffect(() => {
    if (!onlyFavorites || query) return;

    const missingWords = getMissingWordsToFetch(favs, cache, items, requestedWordsRef.current);

    missingWords.forEach((word) => {
      requestedWordsRef.current.add(word);
      dispatch(fetchWordDetails(word));
    });
  }, [onlyFavorites, query, favs, cache, dispatch, items]);

  return (
    <ul className='word-list'>
      {sorted.map((item) => (
        <WordListItem key={item.meta?.uuid} item={item} />
      ))}
    </ul>
  );
}
