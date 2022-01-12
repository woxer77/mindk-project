import React from 'react';

import { Articles } from '../../components/articles/articles';
import { AddArticle } from '../../components/add article/addArticle';
import { Profile } from '../../components/profile/profile';

export function Body({ currentPage }) {
  switch (currentPage) {
    case 'articles': {
      return (
        <Articles
          title="New article about React.js"
          text="React (also known as React.js or ReactJS) is a free and open-source front-end JavaScript library for building user interfaces based on UI components. It is maintained by Meta (formerly Facebook) and a community of individual developers and companies. React can be used as a base in the development of single-page or mobile applications. However, React is only concerned with state management and rendering that state to the DOM, so creating React applications usually requires the use of additional libraries for routing, as well as certain client-side functionality."
          creator="Ohrimenko Denis"
          creationDate="07.01.2022"
        />
      );
    }
    case 'addArticle': {
      return <AddArticle />;
    }
    case 'profile': {
      return (
        <Profile
          fullName="Ohrimenko Denis Yurievich"
          birthDate="20.06.2002"
          placeOfBirth="Ukraine, Sumy"
          educationPlace="Sumy State University"
          phoneNumber="+380665738172"
        />
      );
    }
  }
}
