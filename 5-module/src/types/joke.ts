export type Genre = 'Программистские' | 'Математические' | 'Школьные' | 'Студенческие' | 'Семейные';
export type GenreWithAll = 'all' | Genre;

export type Joke = {
  id: string;
  text: string;
  author: string;
  likes: number;
  dislikes: number;
  isFavorite: boolean;
  genre: string;
};
