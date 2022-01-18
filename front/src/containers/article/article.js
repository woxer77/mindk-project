import React from 'react';
import { useParams } from 'react-router-dom';

import PropTypes from 'prop-types';
import { ShowArticleByNumber } from '../../components/article/articleByNumber';
import { ShowArticleByFormat } from '../../components/article/articleByFormat';
import { ShowArticleByUpLetters } from '../../components/article/articleByUpLetters';

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
      <ShowArticleByNumber
        id={params.id}
        text={text}
        creator={creator}
        creationDate={creationDate}
      />
    );
  }
  if (isUpperLetters(params.id)) {
    return (
      <ShowArticleByUpLetters
        id={params.id}
        text={text}
        creator={creator}
        creationDate={creationDate}
      />
    );
  }
  if (isCorrectFormat(params.id)) {
    return (
      <ShowArticleByFormat
        id={params.id}
        text={text}
        creator={creator}
        creationDate={creationDate}
      />
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
