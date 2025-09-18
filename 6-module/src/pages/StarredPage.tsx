import FiltersPanel from '../components/FiltersPanel';
import SearchBar from '../components/SearchBar';
import WordList from '../components/WordList';

export function StarredPage() {
  return (
    <div className='page'>
      <SearchBar />
      <FiltersPanel />
      <WordList onlyFavorites />
    </div>
  );
}

export default StarredPage;
