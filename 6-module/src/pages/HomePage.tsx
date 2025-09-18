import SearchBar from '../components/SearchBar/SearchBar';
import WordList from '../components/WordList/WordList';
import './HomePage.scss';

export function HomePage() {
  return (
    <div className='home-page'>
      <div className='home-page__hero'>
        <div className='home-page__illustration' />
        <h1 className='home-page__title'>Word Explorer</h1>
        <p className='home-page__subtitle'>
          Discover definitions, pronunciations, and examples for English words. Start your
          linguistic journey today!
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
