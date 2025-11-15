import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { clear, fetchSuggestions, setQuery } from '../../features/search/searchSlice';
import { useAppDispatch } from '../../hooks/hooks';
import { useDebounce } from '../../hooks/useDebounce';
import './SearchBar.scss';

export function SearchBar({ remoteSearch = true }: { remoteSearch?: boolean }) {
  const dispatch = useAppDispatch();
  const [params, setParams] = useSearchParams();
  const [value, setValue] = useState<string>(params.get('q') ?? '');

  useEffect(() => {
    if (remoteSearch) {
      dispatch(setQuery(value));
      if (value.trim().length === 0) {
        dispatch(clear());
      }
    }
  }, [value, dispatch, remoteSearch]);

  function runSearch(query: string) {
    if (!remoteSearch) return;
    if (query.trim().length === 0) return;
    dispatch(fetchSuggestions(query));
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
