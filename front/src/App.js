import React, { useState } from 'react';

import Header from './containers/header/header';
import { Body } from './containers/body/body';

import './App.css';

function App() {
  const [currentPage, setCurrentPage] = useState('profile');

  return (
    <div className="App">
      <Header setCurrentPage={setCurrentPage} />
      <Body currentPage={currentPage} />
    </div>
  );
}

export default App;
