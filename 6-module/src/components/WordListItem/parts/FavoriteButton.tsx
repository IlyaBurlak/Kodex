import { memo } from 'react';
import { toggleFavorite } from '../../../features/favorites/favoritesSlice';
import { upsertWord } from '../../../features/words/wordCacheSlice';
import { useAppDispatch } from '../../../hooks/hooks';
import { WordItem } from '../../../types/word';

interface FavoriteButtonProps {
  isFav: boolean;
  id: string;
  word?: string;
  item?: WordItem;
}

export const FavoriteButton = memo(({ isFav, id, word, item }: FavoriteButtonProps) => {
  const dispatch = useAppDispatch();

  return (
    <button
      aria-label={isFav ? 'Unstar' : 'Star'}
      className={`star ${isFav ? 'active' : ''}`}
      onClick={(e) => {
        e.stopPropagation();
        if (!isFav) {
          if (item) {
            dispatch(upsertWord(item));
          } else if (word) {
            dispatch(upsertWord({ word, meta: { uuid: id } } as any));
          }
        }
        dispatch(toggleFavorite({ uuid: id, word, data: item }));
      }}
    >
      ★
    </button>
  );
});

FavoriteButton.displayName = 'FavoriteButton';
