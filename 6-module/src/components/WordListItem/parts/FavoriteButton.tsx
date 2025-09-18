import { memo } from 'react';
import { toggleFavorite } from '../../../features/favorites/favoritesSlice';
import { useAppDispatch } from '../../../hooks';

interface FavoriteButtonProps {
  isFav: boolean;
  word: string;
}

export const FavoriteButton = memo(({ isFav, word }: FavoriteButtonProps) => {
  const dispatch = useAppDispatch();

  return (
    <button
      aria-label={isFav ? 'Unstar' : 'Star'}
      className={`star ${isFav ? 'active' : ''}`}
      onClick={(e) => {
        e.stopPropagation();
        dispatch(toggleFavorite(word));
      }}
    >
      ★
    </button>
  );
});

FavoriteButton.displayName = 'FavoriteButton';
