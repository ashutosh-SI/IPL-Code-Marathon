import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/styles.css';

const Navbar = () => {
  return (
    <nav className="navbar">
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/add-player">Add Player</Link>
        </li>
        <li>
          <Link to="/match-details">Match details</Link>
        </li>
        <li>
          <Link to="/top-players">Top Players</Link>
        </li>
        <li>
          <Link to="/matches-by-date-range">Matches by date range</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
