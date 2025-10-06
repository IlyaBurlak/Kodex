import { BrowserRouter, Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage';
import './App.scss';
import { Header } from './components/Header/Header';
import { StarredPage } from './pages/StarredPage';

export function App() {
  return (
    <BrowserRouter>
      <div className='app'>
        <Header />
        <main className='app__main'>
          <Routes>
            <Route element={<HomePage />} path='/' />
            <Route element={<StarredPage />} path='/starred' />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}
