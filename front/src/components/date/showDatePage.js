import React from 'react';

import './style.css';
import PropTypes from 'prop-types';

export function ShowDatePage({
  year, month, day, todayDate,
}) {
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
        {todayDate}
      </p>
    </div>
  );
}

ShowDatePage.propTypes = {
  year: PropTypes.number.isRequired,
  month: PropTypes.number.isRequired,
  day: PropTypes.number.isRequired,
  todayDate: PropTypes.string.isRequired,
};
