import React from 'react';
import { useParams } from 'react-router-dom';

import './style.css';
import PropTypes from 'prop-types';

const Article = ({
  text, creator, creationDate,
}) => {
  const params = useParams();

  function isUpperLetters(string) {
    return /^[A-Z]+$/.test(string);
  }

  function isCorrectFormat(string) {
    const arr = string.split('.');
    const [fileName, ext] = arr;
    const validFormats = ['doc', 'pdf', 'jpeg'];

    if (/^[A-Za-z0-9]+$/.test(fileName) && validFormats.includes(ext) && arr.length === 2) return true;
    return false;
  }

  if (Number.isInteger(Number(params.id))) {
    return (
      <div className="articleContainer">
        <p className="title">{`Article with ID by number = ${params.id}`}</p>
        <p className="text">{text}</p>
        <p className="creator">{creator}</p>
        <p className="creationDate">{creationDate}</p>
      </div>
    );
  }
  if (isUpperLetters(params.id)) {
    return (
      <div className="articleContainer">
        <p className="title">{`Article with ID by upper letters = ${params.id}`}</p>
        <p className="text">{text}</p>
        <p className="creator">{creator}</p>
        <p className="creationDate">{creationDate}</p>
      </div>
    );
  }
  if (isCorrectFormat(params.id)) {
    return (
      <div className="articleContainer">
        <p className="title">{`Article with ID by a given format = ${params.id}`}</p>
        <p className="text">{text}</p>
        <p className="creator">{creator}</p>
        <p className="creationDate">{creationDate}</p>
      </div>
    );
  }
  return (<div>Error 404</div>);
};

Article.propTypes = {
  text: PropTypes.string.isRequired,
  creator: PropTypes.string,
  creationDate: PropTypes.string.isRequired,
};

Article.defaultProps = {
  creator: 'unknown creator',
};

export default Article;
