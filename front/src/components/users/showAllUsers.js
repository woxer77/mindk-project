import React from 'react';

import './style.css';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import usersProps from '../../PropTypes/usersProps';

export function ShowAllUsers({
  users,
}) {
  return (
    <div className="usersContainer">
      {users?.map(({
        UserID, FirstName, SecondName, MiddleName, Email, Phone,
      }) => (
        <Link to={`/users/${UserID}`} className="userBlock" id={`userBlock-${UserID}`} key={`userBlock-${UserID}`}>
          <div className="fullName">
            {SecondName}
            {' '}
            {FirstName}
            {' '}
            {MiddleName}
          </div>
          <p>Personal information</p>
          <div className="infoRow">
            <div className="infoRowTitle">Email:</div>
            {' '}
            {Email}
          </div>
          <div className="infoRow">
            <div className="infoRowTitle">Phone number:</div>
            {' '}
            {Phone}
          </div>
        </Link>
      ))}
    </div>
  );
}

ShowAllUsers.propTypes = usersProps;

ShowAllUsers.defaultProps = {
  users: PropTypes.arrayOf(
    PropTypes.shape({
      Avatar: '',
    }),
  ),
};
