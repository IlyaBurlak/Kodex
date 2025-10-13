import { useState } from 'react';

import { Genre, Joke } from '../types/joke';

export const useJokes = () => {
  const [jokes, setJokes] = useState<Joke[]>([
    {
      id: '1',
      text: 'Почему программисты так плохо садятся на диету? Потому что их постоянно тянет на кодировку!',
      author: 'dev_user',
      likes: 24,
      dislikes: 2,
      isFavorite: true,
      genre: 'Программистские',
    },
    {
      id: '2',
      text: 'Математик, физик и инженер стоят возле горящего здания. Математик говорит: "Нужна модель горения!" Физик: "Нужно измерить температуру!" Инженер: "Нужно тушить!"',
      author: 'science_fan',
      likes: 18,
      dislikes: 5,
      isFavorite: false,
      genre: 'Математические',
    },
  ]);

  const addJoke = (text: string, author: string, genre: Genre) => {
    const newJoke: Joke = {
      id: Date.now().toString(),
      text,
      author,
      likes: 0,
      dislikes: 0,
      isFavorite: false,
      genre,
    };
    setJokes((prev) => [newJoke, ...prev]);
  };

  const toggleFavorite = (id: string) => {
    setJokes((prev) =>
      prev.map((joke) => (joke.id === id ? { ...joke, isFavorite: !joke.isFavorite } : joke)),
    );
  };

  const rateJoke = (id: string, action: 'like' | 'dislike') => {
    setJokes((prev) =>
      prev.map((joke) => {
        if (joke.id !== id) return joke;
        return {
          ...joke,
          likes: action === 'like' ? joke.likes + 1 : joke.likes,
          dislikes: action === 'dislike' ? joke.dislikes + 1 : joke.dislikes,
        };
      }),
    );
  };

  return {
    jokes,
    addJoke,
    toggleFavorite,
    rateJoke,
  };
};
