import React from 'react';
import './GenreFilter.scss';

type Genre = 'all' | 'Программистские' | 'Математические' | 'Школьные' | 'Студенческие' | 'Семейные';

type GenreFilterProps = {
    selectedGenre: Genre;
    onSelect: (genre: Genre) => void;
};

const GenreFilter: React.FC<GenreFilterProps> = ({
                                                     selectedGenre,
                                                     onSelect
                                                 }) => {
    const genres: Genre[] = [
        'all',
        'Программистские',
        'Математические',
        'Школьные',
        'Студенческие',
        'Семейные'
    ];

    return (
        <div className="genre-filter">
            <div className="genre-list">
                {genres.map(genre => (
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