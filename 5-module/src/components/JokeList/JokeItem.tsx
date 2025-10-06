import { FC } from 'react';

import { ICONS } from '../../constants/icons';
import { JokeItemProps } from '../../types/joke';

export const JokeItem: FC<JokeItemProps> = ({ joke, onToggleFavorite, onRateJoke }) => {
  return (
    <div className='joke-item'>
      <div className='joke-header'>
        <span className='joke-author'>@{joke.author}</span>
        <span className={`joke-genre ${joke.genre.toLowerCase()}`}>{joke.genre}</span>
      </div>

      <p className='joke-text'>{joke.text}</p>

      <div className='joke-actions'>
        <button
          aria-label={joke.isFavorite ? 'Убрать из избранного' : 'Добавить в избранное'}
          className={`favorite-btn ${joke.isFavorite ? 'active' : ''}`}
          onClick={() => onToggleFavorite(joke.id)}
        >
          {joke.isFavorite ? ICONS.STAR_FILLED : ICONS.STAR_OUTLINE}
        </button>

        <div className='rating-container'>
          <button
            aria-label='Лайк'
            className='like-btn'
            onClick={() => onRateJoke(joke.id, 'like')}
          >
            {ICONS.THUMB_UP} {joke.likes}
          </button>
          <button
            aria-label='Дизлайк'
            className='dislike-btn'
            onClick={() => onRateJoke(joke.id, 'dislike')}
          >
            {ICONS.THUMB_DOWN} {joke.dislikes}
          </button>
        </div>
      </div>
    </div>
  );
};
