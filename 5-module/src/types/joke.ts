export type EntityID = string;
export type RatingAction = 'like' | 'dislike' | null;

const GENRE_DATA = [
  { label: 'Программистские', class: 'programming' },
  { label: 'Математические', class: 'math' },
  { label: 'Школьные', class: 'school' },
  { label: 'Студенческие', class: 'student' },
  { label: 'Семейные', class: 'family' },
] as const;

export type Genre = (typeof GENRE_DATA)[number]['label'];
export type GenreWithAll = 'all' | Genre;

export const GENRES = GENRE_DATA.map((item) => item.label) as Genre[];
export const ALL_GENRES: GenreWithAll[] = ['all', ...GENRES];

export const genreClassMap = GENRE_DATA.reduce(
  (acc, item) => {
    acc[item.label] = item.class;
    return acc;
  },
  {} as Record<Genre, string>,
);

interface BaseEntity {
  id: EntityID;
}

interface JokeActions {
  onRateJoke: (id: EntityID, action: RatingAction) => void;
  onToggleFavorite: (id: EntityID) => void;
}

export interface Joke extends BaseEntity {
  text: string;
  author: string;
  likes: number;
  dislikes: number;
  isFavorite: boolean;
  genre: Genre;
  userRating: 'like' | 'dislike' | null;
}

export interface AddJokeDialogProps {
  onAddJoke: (text: string, author: string, genre: Genre) => void;
}

export interface GenreFilterProps {
  selectedGenre: GenreWithAll;
  onSelect: (genre: GenreWithAll) => void;
}

export interface JokeItemProps extends JokeActions {
  joke: Joke;
}

export interface JokeListProps extends JokeActions {
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
