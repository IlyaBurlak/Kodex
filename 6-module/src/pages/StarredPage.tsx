import FiltersPanel from '../components/FiltersPanel/FiltersPanel';
import SearchBar from '../components/SearchBar/SearchBar';
import WordList from '../components/WordList/WordList';

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
