import React from 'react';
import './GenreFilter.scss';
import { ALL_GENRES, GenreWithAll } from "../../types/joke";

type GenreFilterProps = {
  selectedGenre: GenreWithAll;
  onSelect: (genre: GenreWithAll) => void;
};

const GenreFilter: React.FC<GenreFilterProps> = ({ selectedGenre, onSelect }) => {
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