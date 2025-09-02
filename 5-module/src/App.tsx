import { FC } from 'react';
import { useMemo, useState } from 'react';

import './App.scss';
import useJokes from './hooks/useJokes';
import TabPanel from './components/TabPanel/TabPanel';
import GenreFilter from './components/GenreFilter/GenreFilter';
import JokeList from './components/JokeList/JokeList';
import AddJokeDialog from './components/AddJokeDialog/AddJokeDialog';
import { GenreWithAll } from './types/joke';

const App: FC = () => {
  const { jokes, addJoke, toggleFavorite, rateJoke } = useJokes();
  const [activeTab, setActiveTab] = useState(0);
  const [selectedGenre, setSelectedGenre] = useState<GenreWithAll>('all');

  const tabs = [{ label: 'Все анекдоты' }, { label: 'Избранное' }];

  const filteredJokes = useMemo(() => {
    return jokes.filter((joke) => {
      const byTab = activeTab === 0 || (activeTab === 1 && joke.isFavorite);
      const byGenre = selectedGenre === 'all' || joke.genre === selectedGenre;
      return byTab && byGenre;
    });
  }, [jokes, activeTab, selectedGenre]);

  return (
    <div className='app'>
      <header>
        <h1>Joke Instagram</h1>
        <p>Лучшее место для программистских и математических анекдотов</p>
      </header>

      <main>
        <TabPanel tabs={tabs} activeTab={activeTab} onTabChange={setActiveTab} />

        <GenreFilter selectedGenre={selectedGenre} onSelect={setSelectedGenre} />

        <JokeList jokes={filteredJokes} onToggleFavorite={toggleFavorite} onRateJoke={rateJoke} />

        <AddJokeDialog onAddJoke={addJoke} />
      </main>
    </div>
  );
};

export default App;
