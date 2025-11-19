import { useSearchParams } from 'react-router-dom';
import { WordListItem } from '../WordListItem/WordListItem';
import { WordListState } from './utils/WordListState/WordListState';
import './WordList.scss';
import { useListState } from '../../hooks/useListState';
import { useMissingFavorites } from '../../hooks/useMissingFavorites';
import { useWordListData } from '../../hooks/useWordListData';
import { WordListProps } from '../../types/WordList';
import { getSelectedPosFromParams } from './utils/wordListUtils';

export function WordList({ onlyFavorites = false }: WordListProps) {
  const [params] = useSearchParams();
  const query = params.get('q') ?? '';
  const posParam = onlyFavorites ? (params.get('pos') ?? '') : '';
  const selectedPos = onlyFavorites ? getSelectedPosFromParams(posParam) : [];

  const { sorted, isLoadingFavorites, searchStatus, baseList } = useWordListData(
    onlyFavorites,
    query,
    selectedPos
  );

  useMissingFavorites(onlyFavorites, query);

  const listState = useListState(
    onlyFavorites,
    searchStatus,
    isLoadingFavorites,
    sorted.length,
    baseList.length,
    selectedPos.length
  );

  if (listState) {
    return <WordListState type={listState} query={query} />;
  }

  return (
    <ul className='word-list'>
      {sorted.map((item) => (
        <WordListItem key={item.meta?.uuid} item={item} />
      ))}
    </ul>
  );
}
