import { FiltersPanel } from '../components/FiltersPanel/FiltersPanel';
import { SearchBar } from '../components/SearchBar/SearchBar';
import { WordList } from '../components/WordList/WordList';

export function StarredPage() {
  return (
    <div className='page'>
      <SearchBar remoteSearch={false} />
      <FiltersPanel />
      <WordList onlyFavorites />
    </div>
  );
}
