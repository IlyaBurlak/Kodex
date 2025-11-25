import { WordListStateType } from '../types/WordList';

export function useListState(
  onlyFavorites: boolean,
  searchStatus: 'idle' | 'loading' | 'succeeded' | 'failed',
  isLoadingFavorites: boolean,
  sortedLength: number,
  baseListLength: number,
  selectedPosLength: number
): WordListStateType | null {
  if (!onlyFavorites && searchStatus === 'loading') {
    return 'loading';
  }

  if (onlyFavorites && isLoadingFavorites && sortedLength === 0) {
    return 'loading';
  }

  if (sortedLength === 0) {
    if (onlyFavorites) {
      if (baseListLength > 0 && selectedPosLength > 0) {
        return 'no-words-for-pos';
      } else {
        return 'empty-favorites';
      }
    } else {
      return 'empty-search';
    }
  }

  return null;
}
