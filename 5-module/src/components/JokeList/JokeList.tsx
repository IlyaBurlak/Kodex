import React, { memo } from 'react';
import './JokeList.scss';
import { Joke } from '../../types/joke';
import JokeItem from './JokeItem';

type JokeListProps = {
  jokes: Joke[];
  onToggleFavorite: (id: string) => void;
  onRateJoke: (id: string, action: 'like' | 'dislike') => void;
};

const MemoizedJokeItem = memo(JokeItem);

const JokeList: React.FC<JokeListProps> = ({ jokes, onToggleFavorite, onRateJoke }) => {
  if (jokes.length === 0) {
    return <div className='empty-list'>Нет анекдотов для отображения</div>;
  }

  return (
    <div className='joke-list'>
      {jokes.map((joke) => (
        <MemoizedJokeItem
          key={joke.id}
          joke={joke}
          onToggleFavorite={onToggleFavorite}
          onRateJoke={onRateJoke}
        />
      ))}
    </div>
  );
};

export default JokeList;
