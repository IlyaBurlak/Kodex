import React from 'react';
import JokeItem, { Joke } from './JokeItem';
import './JokeList.scss';

type JokeListProps = {
    jokes: Joke[];
    onToggleFavorite: (id: string) => void;
    onRateJoke: (id: string, action: 'like' | 'dislike') => void;
};

const JokeList: React.FC<JokeListProps> = ({
                                               jokes,
                                               onToggleFavorite,
                                               onRateJoke
                                           }) => {
    if (jokes.length === 0) {
        return <div className="empty-list">Нет анекдотов для отображения</div>;
    }

    return (
        <div className="joke-list">
            {jokes.map(joke => (
                <JokeItem
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