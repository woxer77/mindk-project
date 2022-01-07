import React from 'react';

import { AddNewPostContainer } from './containers/addNewPost/addNewPostContainer';

import './App.css';

function App() {
  const postText = 'Hi, my name is Denis, I started learning React at the MindК Dev Camp courses! React is an open source JavaScript library for developing user interfaces.';
  return (
    <div className="App">
      <header className="App-header">
        <AddNewPostContainer senderName="Denis" senderSurname="Ohrimenko" postText={postText} />
      </header>
    </div>
  );
}

export default App;
