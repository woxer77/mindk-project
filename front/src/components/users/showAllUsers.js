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
        userId, firstName, secondName, middleName, email, phone,
      }) => (
        <Link to={`/users/${userId}`} className="userBlock" id={`userBlock-${userId}`} key={`userBlock-${userId}`}>
          <div className="fullName">
            {secondName}
            {' '}
            {firstName}
            {' '}
            {middleName}
          </div>
          <p>Personal information</p>
          <div className="infoRow">
            <div className="infoRowTitle">Email:</div>
            {' '}
            {email}
          </div>
          <div className="infoRow">
            <div className="infoRowTitle">Phone number:</div>
            {' '}
            {phone}
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
      avatar: null,
    }),
  ),
};
