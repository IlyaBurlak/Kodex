import { sortItemsAlphabetically } from '../components/WordList/utils/wordListUtils';
import { selectBaseList, selectItemsByPartOfSpeech } from '../features/selectors/wordListSelectors';
import { useAppSelector } from './hooks';

export function useWordListData(onlyFavorites: boolean, query: string, selectedPos: string[]) {
  const {
    searchResults: items,
    wordCache: cache,
    favorites: favs,
    searchStatus,
    loadingWords,
  } = useAppSelector((state) => state.dictionary);

  const baseList = useAppSelector((state) => selectBaseList(state, onlyFavorites, query));
  const filtered = useAppSelector((state) =>
    selectItemsByPartOfSpeech(state, baseList, selectedPos)
  );

  const sorted = sortItemsAlphabetically(filtered);
  const isLoadingFavorites =
    onlyFavorites && favs.some((fav) => fav.word && loadingWords[fav.word]);

  return {
    sorted,
    isLoadingFavorites,
    searchStatus,
    baseList,
    items,
    cache,
    favs,
  };
}
