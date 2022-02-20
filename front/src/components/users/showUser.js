import React from 'react';

import './style.css';
import PropTypes from 'prop-types';
import {
  Grid, Box,
} from '@mui/material';
import usersProps from '../../PropTypes/usersProps';

export function ShowUser({
  user,
}) {
  return (
    <Box sx={{ width: '80%' }} className="usersContainer">
      <Grid className="userBlock">
        <div className="fullName">
          {user.secondName}
          {' '}
          {user.firstName}
          {' '}
          {user.middleName}
        </div>
        <p>Personal information</p>
        <div className="infoRow">
          <div className="infoRowTitle">Email:</div>
          {' '}
          {user.email}
        </div>
        <div className="infoRow">
          <div className="infoRowTitle">Phone number:</div>
          {' '}
          {user.phone}
        </div>
        <div className="infoRow">
          <div className="infoRowTitle">Country:</div>
          {' '}
          {user.country}
        </div>
        <div className="infoRow">
          <div className="infoRowTitle">Avatar adding:</div>
          {' '}
          <form
            encType="multipart/form-data"
            action={`http://localhost:2001/users/${user.userId}/avatar`}
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
