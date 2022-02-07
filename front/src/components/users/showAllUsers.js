import React from 'react';

import './style.css';
import PropTypes from 'prop-types';
import {
  Grid, Box,
} from '@mui/material';
import { Link } from 'react-router-dom';
import usersProps from '../../PropTypes/usersProps';

export function ShowAllUsers({
  users,
}) {
  return (
    <Box sx={{ width: '80%' }} className="usersContainer">
      <Grid container justifyContent="space-around">
        {users?.map(({
          userId, firstName, secondName, middleName, email, phone,
        }) => (
          <Grid className="userBlock" key={`userBlock-${userId}`} id={`userBlock-${userId}`}>
            <Link to={`/users/${userId}`} className="userBlock-link">
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
          </Grid>
        ))}
      </Grid>
    </Box>
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
