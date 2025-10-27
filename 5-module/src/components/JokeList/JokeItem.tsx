import { FC } from 'react';
import { IconType } from 'react-icons';

import { ICONS } from '../../constants/icons';
import { JokeItemProps } from '../../types/joke';

export const JokeItem: FC<JokeItemProps> = ({ joke, onToggleFavorite, onRateJoke }) => {
  const StarIcon = (joke.isFavorite ? ICONS.STAR_FILLED : ICONS.STAR_OUTLINE) as IconType;
  const ThumbUp = ICONS.THUMB_UP as IconType;
  const ThumbDown = ICONS.THUMB_DOWN as IconType;

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
          <StarIcon />
        </button>

        <div className='rating-container'>
          <button
            aria-label='Лайк'
            className='like-btn'
            onClick={() => onRateJoke(joke.id, 'like')}
          >
            <ThumbUp /> <span className='count'>{joke.likes}</span>
          </button>
          <button
            aria-label='Дизлайк'
            className='dislike-btn'
            onClick={() => onRateJoke(joke.id, 'dislike')}
          >
            <ThumbDown /> <span className='count'>{joke.dislikes}</span>
          </button>
        </div>
      </div>
    </div>
  );
};
