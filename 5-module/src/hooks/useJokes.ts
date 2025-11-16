import { useEffect, useState } from 'react';

import { Genre, Joke, RatingAction } from '../types/joke';

const JOKES_STORAGE_KEY = 'jokes-data';

export const useJokes = () => {
  const [jokes, setJokes] = useState<Joke[]>(() => {
    const savedJokes = localStorage.getItem(JOKES_STORAGE_KEY);
    if (savedJokes) {
      try {
        return JSON.parse(savedJokes);
      } catch (error) {
        console.error('Ошибка при загрузке шуток из LocalStorage:', error);
        return getInitialJokes();
      }
    }
    return getInitialJokes();
  });

  useEffect(() => {
    localStorage.setItem(JOKES_STORAGE_KEY, JSON.stringify(jokes));
  }, [jokes]);

  const addJoke = (text: string, author: string, genre: Genre) => {
    const newJoke: Joke = {
      id: Date.now().toString(),
      text,
      author,
      likes: 0,
      dislikes: 0,
      isFavorite: false,
      genre,
      userRating: null,
    };
    setJokes((prev) => [newJoke, ...prev]);
  };

  const toggleFavorite = (id: string) => {
    setJokes((prev) =>
      prev.map((joke) => (joke.id === id ? { ...joke, isFavorite: !joke.isFavorite } : joke)),
    );
  };

  const rateJoke = (id: string, action: RatingAction) => {
    setJokes((prev) =>
      prev.map((joke) => {
        if (joke.id !== id) return joke;

        const currentRating = joke.userRating;
        let { likes, dislikes } = joke;

        if (currentRating === 'like') {
          likes--;
        } else if (currentRating === 'dislike') {
          dislikes--;
        }

        if (action === 'like') {
          likes++;
        } else if (action === 'dislike') {
          dislikes++;
        }

        return {
          ...joke,
          likes,
          dislikes,
          userRating: action,
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

function getInitialJokes(): Joke[] {
  return [
    {
      id: '1',
      text: 'Почему программисты так плохо садятся на диету? Потому что их постоянно тянет на кодировку!',
      author: 'dev_user',
      likes: 24,
      dislikes: 2,
      isFavorite: true,
      genre: 'Программистские',
      userRating: null,
    },
    {
      id: '2',
      text: 'Математик, физик и инженер стоят возле горящего здания. Математик говорит: "Нужна модель горения!" Физик: "Нужно измерить температуру!" Инженер: "Нужно тушить!"',
      author: 'science_fan',
      likes: 18,
      dislikes: 5,
      isFavorite: false,
      genre: 'Математические',
      userRating: null,
    },
  ];
}
