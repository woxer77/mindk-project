import React from 'react';

import {
  BrowserRouter,
  Routes,
  Route,
} from 'react-router-dom';

import './App.css';
import { Articles } from './components/articles/articles';
import { AddArticle } from './components/add article/addArticle';
import { Profile } from './components/profile/profile';
import { DateComp } from './components/date/date';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<p>Hello, this is main page</p>} />
          <Route path="/articles/add-article" element={<AddArticle />} />
          <Route
            path="/articles/:id"
            element={(
              <Articles
                text="React (also known as React.js or ReactJS) is a free and open-source front-end JavaScript library for building user interfaces based on UI components. It is maintained by Meta (formerly Facebook) and a community of individual developers and companies. React can be used as a base in the development of single-page or mobile applications. However, React is only concerned with state management and rendering that state to the DOM, so creating React applications usually requires the use of additional libraries for routing, as well as certain client-side functionality."
                creator="Ohrimenko Denis"
                creationDate="07.01.2022"
              />
            )}
          />
          <Route
            path="/profile"
            element={(
              <Profile
                fullName="Ohrimenko Denis Yurievich"
                birthDate="20.06.2002"
                placeOfBirth="Ukraine, Sumy"
                educationPlace="Sumy State University"
                phoneNumber="+380665738172"
              />
            )}
          />
          <Route path="/date/:date" element={<DateComp />} />
          <Route path="*" element={<div>Error 404</div>} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
