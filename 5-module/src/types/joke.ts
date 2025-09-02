export type EntityID = string;
export type RatingAction = 'like' | 'dislike';

export type Genre = 'Программистские' | 'Математические' | 'Школьные' | 'Студенческие' | 'Семейные';
export type GenreWithAll = 'all' | Genre;

export const GENRES: Genre[] = [
  'Программистские',
  'Математические',
  'Школьные',
  'Студенческие',
  'Семейные',
];

export const ALL_GENRES: GenreWithAll[] = ['all', ...GENRES];

interface BaseEntity {
  id: EntityID;
}

interface Rateable {
  onRateJoke: (id: EntityID, action: RatingAction) => void;
}

interface FavoriteToggle {
  onToggleFavorite: (id: EntityID) => void;
}

export interface Joke extends BaseEntity {
  text: string;
  author: string;
  likes: number;
  dislikes: number;
  isFavorite: boolean;
  genre: Genre;
}

export interface AddJokeDialogProps {
  onAddJoke: (text: string, author: string, genre: Genre) => void;
}

export interface GenreFilterProps {
  selectedGenre: GenreWithAll;
  onSelect: (genre: GenreWithAll) => void;
}

export interface JokeItemProps extends FavoriteToggle, Rateable {
  joke: Joke;
}

export interface JokeListProps extends FavoriteToggle, Rateable {
  jokes: Joke[];
}

export interface Tab {
  label: string;
}

export interface TabPanelProps {
  tabs: Tab[];
  activeTab: number;
  onTabChange: (index: number) => void;
}
