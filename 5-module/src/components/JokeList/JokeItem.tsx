import React from 'react';
import { JokeItemProps } from "../../types/joke";
import { ICONS } from '../../constants/icons';


const JokeItem: React.FC<JokeItemProps> = ({ joke, onToggleFavorite, onRateJoke }) => {
  return (
    <div className='joke-item'>
      <div className='joke-header'>
        <span className='joke-author'>@{joke.author}</span>
        <span className={`joke-genre ${joke.genre.toLowerCase()}`}>{joke.genre}</span>
      </div>

      <p className='joke-text'>{joke.text}</p>

      <div className='joke-actions'>
        <button
          className={`favorite-btn ${joke.isFavorite ? 'active' : ''}`}
          onClick={() => onToggleFavorite(joke.id)}
          aria-label={joke.isFavorite ? 'Убрать из избранного' : 'Добавить в избранное'}
        >
          {joke.isFavorite ? ICONS.STAR_FILLED : ICONS.STAR_OUTLINE}
        </button>

        <div className='rating-container'>
          <button
            className='like-btn'
            onClick={() => onRateJoke(joke.id, 'like')}
            aria-label='Лайк'
          >
            {ICONS.THUMB_UP} {joke.likes}
          </button>
          <button
            className='dislike-btn'
            onClick={() => onRateJoke(joke.id, 'dislike')}
            aria-label='Дизлайк'
          >
            {ICONS.THUMB_DOWN} {joke.dislikes}
          </button>
        </div>
      </div>
    </div>
  );
};

export default JokeItem;
