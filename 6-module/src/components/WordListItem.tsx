import { memo, useState } from 'react';
import { toggleFavorite } from '../features/favorites/favoritesSlice';
import { SearchItem } from '../features/search/searchSlice';
import { useAppDispatch, useAppSelector } from '../hooks';

function truncate(text: string, max: number) {
  if (text.length <= max) {
    return text;
  }
  return text.slice(0, max - 1) + '…';
}

export function WordListItem({ item }: { item: SearchItem }) {
  const dispatch = useAppDispatch();
  const favs = useAppSelector((s) => s.favorites.words);
  const [open, setOpen] = useState(false);
  const isFav = favs.includes(item.word);

  const short = item.shortdef?.[0] ?? '';

  return (
    <li className='word-item'>
      <div className='summary' onClick={() => setOpen((v) => !v)}>
        <span className='word'>{item.word}</span>
        {item.fl && <span className='pos'>{item.fl}</span>}
        {short && <span className='meaning'>{truncate(short, 60)}</span>}
        <button
          aria-label={isFav ? 'Unstar' : 'Star'}
          className={`star ${isFav ? 'active' : ''}`}
          onClick={(e) => {
            e.stopPropagation();
            dispatch(toggleFavorite(item.word));
          }}
        >
          ★
        </button>
      </div>
      {open && (
        <div className='details'>
          {item.phonetic && <div className='phonetic'>[{item.phonetic}]</div>}
          {item.shortdef && (
            <ol className='defs'>
              {item.shortdef.map((d, idx) => (
                <li key={idx}>{d}</li>
              ))}
            </ol>
          )}
        </div>
      )}
    </li>
  );
}

export default memo(WordListItem);
