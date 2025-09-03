import { FC, memo } from 'react';

import './JokeList.scss';

import { JokeListProps } from '../../types/joke';
import JokeItem from './JokeItem';

const MemoizedJokeItem = memo(JokeItem);

const JokeList: FC<JokeListProps> = ({ jokes, onToggleFavorite, onRateJoke }) => {
  if (jokes.length === 0) {
    return <div className='empty-list'>Нет анекдотов для отображения</div>;
  }

  return (
    <div className='joke-list'>
      {jokes.map((joke) => (
        <MemoizedJokeItem
          key={joke.id}
          joke={joke}
          onRateJoke={onRateJoke}
          onToggleFavorite={onToggleFavorite}
        />
      ))}
    </div>
  );
};

export default JokeList;
