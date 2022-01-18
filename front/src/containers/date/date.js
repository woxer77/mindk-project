import React from 'react';
import { useParams } from 'react-router-dom';
import { ShowDatePage } from '../../components/date/showDatePage';

let year;
let month;
let day;

export function DateCont() {
  const params = useParams();

  function getTodayDate() {
    const today = new Date();
    return `${today.getFullYear()}-${today.getMonth() + 1}-${today.getDate()}`;
  }

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
      <ShowDatePage
        year={year}
        month={month}
        day={day}
        todayDate={getTodayDate()}
      />
    );
  }
  return (<div>Error 404</div>);
}
