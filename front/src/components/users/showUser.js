import React from 'react';

import './style.css';
import PropTypes from 'prop-types';
import usersProps from '../../PropTypes/usersProps';

export function ShowUser({
  users,
}) {
  return (
    <div className="usersContainer">
      {users?.map(({
        UserID, FirstName, SecondName, MiddleName, Email, Phone,
      }) => (
        <div className="userBlock" id={UserID}>
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
        </div>
      ))}
    </div>
  );
}

ShowUser.propTypes = usersProps;

ShowUser.defaultProps = {
  user: PropTypes.arrayOf(
    PropTypes.shape({
      Avatar: '',
    }),
  ),
};
