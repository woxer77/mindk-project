import React from 'react';
import './style.css';

const Articles = ({
  title, text, creator, creationDate,
}) => (
  <div className="articleContainer">
    <p className="title">{title}</p>
    <p className="text">{text}</p>
    <p className="creator">{creator}</p>
    <p className="creationDate">{creationDate}</p>
  </div>
);

export default Articles;
