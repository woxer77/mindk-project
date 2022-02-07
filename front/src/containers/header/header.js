import React from 'react';

import './style.css';

export function Header({ setCurrentPage }) {
  const COMPONENTS_IDS = {
    ARTICLES: 'article',
    ADD_ARTICLE: 'addArticle',
    PROFILE: 'profile',
  };

  return (
    <header>
      <button type="button" onClick={() => setCurrentPage(COMPONENTS_IDS.ARTICLES)}> Articles </button>
      <button type="button" onClick={() => setCurrentPage(COMPONENTS_IDS.ADD_ARTICLE)}> Add Article </button>
      <button type="button" onClick={() => setCurrentPage(COMPONENTS_IDS.PROFILE)}> Profile </button>
    </header>
  );
}

// import React from 'react';
// import './posts.css';
//
// export function Header({ setCurrentPage }) {
//   const COMPONENTS_IDS = {
//     ARTICLES: 'article',
//     ADD_ARTICLE: 'addArticle',
//     PROFILE: 'profile',
//   };
//
//   let componentId;
//   const setPage = (componentId) = () => {
//     setCurrentPage(componentId);
//   };
//
//   return (
//     <header>
//       <button type="button" onClick={setPage(COMPONENTS_IDS.ARTICLES)}> Article </button>
//       <button type="button" onClick={setPage(COMPONENTS_IDS.ADD_ARTICLE)}> Add Article </button>
//       <button type="button" onClick={setPage(COMPONENTS_IDS.PROFILE)}> Profile </button>
//     </header>
//   );
// }
