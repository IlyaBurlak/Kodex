import { memo, MouseEvent } from 'react';
import { toggleFavorite, upsertWord } from '../../../features/dictionarySlice';
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

  const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();

    if (!isFav) {
      if (item) {
        dispatch(upsertWord(item));
      } else if (word) {
        const payload: WordItem = { word, meta: { uuid: id } };
        dispatch(upsertWord(payload));
      }
    }

    dispatch(toggleFavorite({ uuid: id, word, data: item }));
  };

  return (
    <button
      aria-label={isFav ? 'Unstar' : 'Star'}
      className={`star ${isFav ? 'active' : ''}`}
      onClick={handleClick}
    >
      ★
    </button>
  );
});

FavoriteButton.displayName = 'FavoriteButton';
