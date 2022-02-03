import React from 'react';

import './style.css';
import PropTypes from 'prop-types';
import {
  Grid, Box,
} from '@mui/material';
import usersProps from '../../PropTypes/usersProps';

export function ShowUser({
  users,
}) {
  // сделал константой, т.к. если передавать строку напрямую в аргумент - выбивает ошибку
  // Cannot read properties of null (reading 'value')
  const action = `http://localhost:2001/users/${users[0].userId}/avatar`;
  return (
    <Box sx={{ width: '80%' }} className="usersContainer">
      <Grid item xs={5} className="userBlock" id={users[0].userId}>
        <div className="fullName">
          {users[0].secondName}
          {' '}
          {users[0].firstName}
          {' '}
          {users[0].middleName}
        </div>
        <p>Personal information</p>
        <div className="infoRow">
          <div className="infoRowTitle">Email:</div>
          {' '}
          {users[0].email}
        </div>
        <div className="infoRow">
          <div className="infoRowTitle">Phone number:</div>
          {' '}
          {users[0].phone}
        </div>
        <div className="infoRow">
          <div className="infoRowTitle">Avatar adding:</div>
          {' '}
          <form
            encType="multipart/form-data"
            action={`http://localhost:2001/users/${users[0].userId}/avatar`}
            method="POST"
          >
            <input type="file" name="avatar" />
            <button type="submit">Send an avatar</button>
          </form>
        </div>
      </Grid>
    </Box>
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
