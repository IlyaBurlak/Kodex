import { FC } from 'react';
import './GenreFilter.scss';
import { ALL_GENRES, GenreFilterProps } from '../../types/joke';

const GenreFilter: FC<GenreFilterProps> = ({ selectedGenre, onSelect }) => {
  return (
    <div className='genre-filter'>
      <div className='genre-list'>
        {ALL_GENRES.map((genre) => (
          <button
            key={genre}
            className={`genre-tag ${selectedGenre === genre ? 'active' : ''}`}
            onClick={() => onSelect(genre)}
          >
            {genre === 'all' ? 'Все жанры' : genre}
          </button>
        ))}
      </div>
    </div>
  );
};

export default GenreFilter;
