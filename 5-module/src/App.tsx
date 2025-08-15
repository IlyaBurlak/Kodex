import * as React from 'react';
import { useState } from 'react';

import './App.scss';
import useJokes from "./hooks/useJokes";
import TabPanel from "./components/TabPanel/TabPanel";
import GenreFilter from "./components/GenreFilter/GenreFilter";
import JokeList from "./components/JokeList/JokeList";
import AddJokeDialog from "./components/AddJokeDialog/AddJokeDialog";

type Genre = 'all' | 'Программистские' | 'Математические' | 'Школьные' | 'Студенческие' | 'Семейные';

const App: React.FC = () => {
    const { jokes, addJoke, toggleFavorite, rateJoke } = useJokes();
    const [activeTab, setActiveTab] = useState(0);
    const [selectedGenre, setSelectedGenre] = useState<Genre>('all');

    const tabs = [
        { label: 'Все анекдоты' },
        { label: 'Избранное' },
    ];

    const filteredJokes = jokes.filter(joke => {
        const byTab = activeTab === 0 || (activeTab === 1 && joke.isFavorite);
        const byGenre = selectedGenre === 'all' || joke.genre === selectedGenre;
        return byTab && byGenre;
    });

    return (
        <div className="app">
            <header>
                <h1>Joke Instagram</h1>
                <p>Лучшее место для программистских и математических анекдотов</p>
            </header>

            <main>
                <TabPanel
                    tabs={tabs}
                    activeTab={activeTab}
                    onTabChange={setActiveTab}
                />

                <GenreFilter
                    selectedGenre={selectedGenre}
                    onSelect={setSelectedGenre}
                />

                <JokeList
                    jokes={filteredJokes}
                    onToggleFavorite={toggleFavorite}
                    onRateJoke={rateJoke}
                />

                <AddJokeDialog onAddJoke={addJoke} />
            </main>
        </div>
    );
};

export default App;