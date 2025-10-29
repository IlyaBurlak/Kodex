import { FC } from 'react';

import { ICONS } from '../../constants/icons';
import { JokeItemProps, genreClassMap } from '../../types/joke';

export const JokeItem: FC<JokeItemProps> = ({ joke, onToggleFavorite, onRateJoke }) => {
  const StarIcon = joke.isFavorite ? ICONS.STAR_FILLED : ICONS.STAR_OUTLINE;
  const ThumbUp = ICONS.THUMB_UP;
  const ThumbDown = ICONS.THUMB_DOWN;

  const userRating = joke.userRating || null;
  const genreClass = genreClassMap[joke.genre];

  const handleRateClick = (type: 'like' | 'dislike') => {
    if (userRating === type) {
      onRateJoke(joke.id, null);
    } else {
      onRateJoke(joke.id, type);
    }
  };

  return (
    <div className='joke-item'>
      <div className='joke-header'>
        <span className='joke-author'>@{joke.author}</span>
        <span className={`joke-genre ${genreClass}`}>{joke.genre}</span>
      </div>

      <p className='joke-text'>{joke.text}</p>

      <div className='joke-actions'>
        <button
          aria-label={joke.isFavorite ? 'Убрать из избранного' : 'Добавить в избранное'}
          className={`favorite-btn ${joke.isFavorite ? 'active' : ''}`}
          onClick={() => onToggleFavorite(joke.id)}
        >
          <StarIcon />
        </button>

        <div className='rating-container'>
          <button
            aria-label='Лайк'
            className={`like-btn ${userRating === 'like' ? 'active' : ''}`}
            onClick={() => handleRateClick('like')}
          >
            <ThumbUp /> <span className='count'>{joke.likes}</span>
          </button>
          <button
            aria-label='Дизлайк'
            className={`dislike-btn ${userRating === 'dislike' ? 'active' : ''}`}
            onClick={() => handleRateClick('dislike')}
          >
            <ThumbDown /> <span className='count'>{joke.dislikes}</span>
          </button>
        </div>
      </div>
    </div>
  );
};
