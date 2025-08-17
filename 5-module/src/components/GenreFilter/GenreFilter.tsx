import React from 'react';
import './GenreFilter.scss';
import { GenreWithAll } from '../../types/joke';

type GenreFilterProps = {
  selectedGenre: GenreWithAll;
  onSelect: (genre: GenreWithAll) => void;
};

const GenreFilter: React.FC<GenreFilterProps> = ({ selectedGenre, onSelect }) => {
  const genres: GenreWithAll[] = [
    'all',
    'Программистские',
    'Математические',
    'Школьные',
    'Студенческие',
    'Семейные',
  ];

  return (
    <div className='genre-filter'>
      <div className='genre-list'>
        {genres.map((genre) => (
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
