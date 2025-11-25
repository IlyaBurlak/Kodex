import { useEffect, useState } from 'react';
import { fetchWordDetails } from '../features/searchThunks';
import { SearchItem, WordItem } from '../types/word';
import { useAppDispatch, useAppSelector } from './hooks';

export function useWordItemData(item: WordItem | SearchItem) {
  const dispatch = useAppDispatch();
  const { favorites, wordCache, loadingWords } = useAppSelector((state) => state.dictionary);

  const [open, setOpen] = useState(false);

  const itemUuid = item.meta?.uuid;
  const isFav = itemUuid ? favorites.some((fav) => fav.uuid === itemUuid) : false;
  const short = item.shortdef?.[0] ?? '';
  const cachedDataRaw = wordCache[item.word] ?? item;
  const isLoading = Boolean(loadingWords[item.word]);

  const isWordItem = (candidate: unknown): candidate is WordItem =>
    typeof candidate === 'object' && candidate !== null && 'word' in candidate;

  useEffect(() => {
    if (open) {
      const hasDetails = isWordItem(cachedDataRaw) && !!cachedDataRaw.detailed;
      if (!hasDetails) {
        dispatch(fetchWordDetails(item.word));
      }
    }
  }, [open, cachedDataRaw, dispatch, item.word]);

  return {
    open,
    setOpen,
    isFav,
    short,
    cachedDataRaw,
    isLoading,
    isWordItem,
  };
}
