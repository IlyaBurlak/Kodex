import { Link, NavLink } from 'react-router-dom';
import './Header.scss';

export function Header() {
  return (
    <nav className='header'>
      <Link className='header__brand' to='/'>
        Dictionary
      </Link>
      <div className='header__nav-links'>
        <NavLink to='/' end>
          Home
        </NavLink>
        <NavLink to='/starred'>Starred words</NavLink>
      </div>
    </nav>
  );
}
