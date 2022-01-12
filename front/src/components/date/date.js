import React from 'react';
import { useParams } from 'react-router-dom';

import './style.css';

let year;
let month;
let day;

function getTodayDate() {
  const today = new Date();
  return `${today.getFullYear()}-${today.getMonth() + 1}-${today.getDate()}`;
}

export function DateComp() {
  const params = useParams();

  function isDateCorrect(string) {
    const arr = string.split('-');
    [year, month, day] = arr;

    if (!Number.isNaN(Date.parse(`${year}-${month}-${day}`)) && Date.parse(`${year}-${month}-${day}`) < Date.now() && arr.length === 3) {
      return true;
    }
    return false;
  }

  if (isDateCorrect(params.date)) {
    return (
      <div className="dateContainer">
        <p>
          The date of your request:
          {' '}
          {`${year}-${month}-${day}`}
        </p>
        <p>
          {/* eslint-disable-next-line react/no-unescaped-entities */}
          Today's date:
          {' '}
          {getTodayDate()}
        </p>
      </div>
    );
  }
  return (<div>Error 404</div>);
}
