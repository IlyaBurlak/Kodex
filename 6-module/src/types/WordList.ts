export type WordListStateType =
  | 'loading'
  | 'empty-favorites'
  | 'empty-search'
  | 'empty'
  | 'no-words-for-pos';

export interface WordListProps {
  onlyFavorites?: boolean;
}
