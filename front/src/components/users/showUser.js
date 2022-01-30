import React from 'react';

import './style.css';
import PropTypes from 'prop-types';
import usersProps from '../../PropTypes/usersProps';

export function ShowUser({
  users,
}) {
  // сделал константой, т.к. если передавать строку напрямую в аргумент - выбивает ошибку
  // Cannot read properties of null (reading 'value')
  const action = `http://localhost:2001/users/${users[0].userId}/avatar`;
  return (
    <div className="usersContainer">
      {users?.map(({
        userId, firstName, secondName, middleName, email, phone,
      }) => (
        <div className="userBlock" id={userId}>
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
          <div className="infoRow">
            <div className="infoRowTitle">Avatar adding:</div>
            {' '}
            <form encType="multipart/form-data" action={action} method="POST">
              <input type="file" name="avatar" />
              <button type="submit">Send an avatar</button>
            </form>
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
      avatar: null,
    }),
  ),
};
