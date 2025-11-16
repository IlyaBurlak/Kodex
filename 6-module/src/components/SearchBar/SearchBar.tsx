import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useAppDispatch } from '../../hooks/hooks';
import { useDebounce } from '../../hooks/useDebounce';
import './SearchBar.scss';
import { clearSearch, setQuery } from '../../features/dictionarySlice';
import { fetchSuggestions } from '../../features/searchThunks';

export type SearchBarProps = {
  remoteSearch?: boolean;
};

export function SearchBar({ remoteSearch = true }: SearchBarProps) {
  const dispatch = useAppDispatch();
  const [params, setParams] = useSearchParams();
  const [value, setValue] = useState<string>(params.get('q') ?? '');

  useEffect(() => {
    if (remoteSearch) {
      dispatch(setQuery(value));
      if (value.trim().length === 0) {
        dispatch(clearSearch());
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
        onChange={(event) => setValue(event.target.value)}
      />
    </div>
  );
}
