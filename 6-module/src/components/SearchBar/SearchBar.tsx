import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { fetchSuggestions, setQuery } from '../../features/search/searchSlice';
import { useAppDispatch } from '../../hooks/hooks';
import { useDebounce } from '../../hooks/useDebounce';
import './SearchBar.scss';

export function SearchBar() {
  const dispatch = useAppDispatch();
  const [params, setParams] = useSearchParams();
  const [value, setValue] = useState<string>(params.get('q') ?? '');

  useEffect(() => {
    dispatch(setQuery(value));
  }, [value, dispatch]);

  function runSearch(q: string) {
    if (q.trim().length === 0) return;
    dispatch(fetchSuggestions(q));
  }

  const debouncedSearch = useDebounce(runSearch, 400);

  useEffect(() => {
    setParams((prev) => {
      const next = new URLSearchParams(prev);
      if (value) {
        next.set('q', value);
      } else {
        next.delete('q');
      }
      return next;
    });
    debouncedSearch(value);
  }, [value, debouncedSearch, setParams]);

  return (
    <div className='searchbar'>
      <input
        aria-label='Search'
        placeholder='Search for words...'
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
    </div>
  );
}

export default SearchBar;
