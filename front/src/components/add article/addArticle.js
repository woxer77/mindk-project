import React from 'react';
import './style.css';

const AddArticle = () => (
  <div className="addArticleContainer">
    <p>
      Enter the title of the article in the field below:
    </p>
    <textarea cols="45" rows="2" />
    <p>
      Enter the text of the article in the field below:
    </p>
    <textarea cols="45" rows="10" />
    <button type="button"> Add the article </button>
  </div>
);

export default AddArticle;
