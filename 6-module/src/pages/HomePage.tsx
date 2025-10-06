import './HomePage.scss';
import { SearchBar } from '../components/SearchBar/SearchBar';
import { WordList } from '../components/WordList/WordList';

export function HomePage() {
  return (
    <div className='home-page'>
      <div className='home-page__hero'>
        <div className='home-page__illustration' />
        <h1 className='home-page__title'>Word Explorer</h1>
        <p className='home-page__subtitle'>
          Check out definitions, pronunciations, and examples of English words. Honestly, I just
          wanted a catchy phrase.
        </p>
      </div>

      <div className='search-section'>
        <SearchBar />
        <WordList />
      </div>
    </div>
  );
}

export default HomePage;
