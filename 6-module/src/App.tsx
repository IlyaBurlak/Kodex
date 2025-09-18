import { BrowserRouter, Link, NavLink, Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage';
import StarredPage from './pages/StarredPage';
import './App.scss';

function App() {
  return (
    <BrowserRouter>
      <div className='app'>
        <nav className='topbar'>
          <Link className='brand' to='/'>
            Dictionary
          </Link>
          <div className='nav-links'>
            <NavLink to='/' end>
              Home
            </NavLink>
            <NavLink to='/starred'>Starred words</NavLink>
          </div>
        </nav>
        <main>
          <Routes>
            <Route element={<HomePage />} path='/' />
            <Route element={<StarredPage />} path='/starred' />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}

export default App;
