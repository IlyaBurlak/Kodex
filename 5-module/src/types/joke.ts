export type Genre = 'Программистские' | 'Математические' | 'Школьные' | 'Студенческие' | 'Семейные';
export type GenreWithAll = 'all' | Genre;

export type Joke = {
  id: string;
  text: string;
  author: string;
  likes: number;
  dislikes: number;
  isFavorite: boolean;
  genre: Genre;
};

export const GENRES: Genre[] = [
  'Программистские',
  'Математические',
  'Школьные',
  'Студенческие',
  'Семейные'
];

export const ALL_GENRES: GenreWithAll[] = [
  'all',
  'Программистские',
  'Математические',
  'Школьные',
  'Студенческие',
  'Семейные',
];