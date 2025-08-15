import React from 'react';

export type Joke = {
    id: string;
    text: string;
    author: string;
    likes: number;
    dislikes: number;
    isFavorite: boolean;
    genre: string;
};

type JokeItemProps = {
    joke: Joke;
    onToggleFavorite: (id: string) => void;
    onRateJoke: (id: string, action: 'like' | 'dislike') => void;
};

const JokeItem: React.FC<JokeItemProps> = ({
                                               joke,
                                               onToggleFavorite,
                                               onRateJoke
                                           }) => {
    return (
        <div className="joke-item">
            <div className="joke-header">
                <span className="joke-author">@{joke.author}</span>
                <span className={`joke-genre ${joke.genre.toLowerCase()}`}>
          {joke.genre}
        </span>
            </div>

            <p className="joke-text">{joke.text}</p>

            <div className="joke-actions">
                <button
                    className={`favorite-btn ${joke.isFavorite ? 'active' : ''}`}
                    onClick={() => onToggleFavorite(joke.id)}
                    aria-label={joke.isFavorite ? "Убрать из избранного" : "Добавить в избранное"}
                >
                    {joke.isFavorite ? '★' : '☆'}
                </button>

                <div className="rating-container">
                    <button
                        className="like-btn"
                        onClick={() => onRateJoke(joke.id, 'like')}
                        aria-label="Лайк"
                    >
                        👍 {joke.likes}
                    </button>
                    <button
                        className="dislike-btn"
                        onClick={() => onRateJoke(joke.id, 'dislike')}
                        aria-label="Дизлайк"
                    >
                        👎 {joke.dislikes}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default JokeItem;