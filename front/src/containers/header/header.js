import React from 'react';
import './style.css';

const Header = ({ setCurrentPage }) => (
  <header>
    <button type="button" onClick={() => setCurrentPage('articles')}> Articles </button>
    <button type="button" onClick={() => setCurrentPage('addArticle')}> Add Article </button>
    <button type="button" onClick={() => setCurrentPage('profile')}> Profile </button>
  </header>
);

export default Header;
