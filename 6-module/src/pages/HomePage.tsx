import SearchBar from '../components/SearchBar';
import WordList from '../components/WordList';

export function HomePage() {
  return (
    <div className='page'>
      <SearchBar />
      <WordList />
    </div>
  );
}

export default HomePage;
