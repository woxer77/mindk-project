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
      <Grid container justifyContent="space-around" rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
        {users?.map(({
          userId, firstName, secondName, middleName, email, phone,
        }) => (
          <Grid item xs={5} className="userBlock">
            <Link to={`/users/${userId}`} id={`userBlock-${userId}`} key={`userBlock-${userId}`} className="userBlock-link">
              <div className="fullName" item xs={6}>
                {secondName}
                {' '}
                {firstName}
                {' '}
                {middleName}
              </div>
              <p>Personal information</p>
              <div className="infoRow" item xs={6}>
                <div className="infoRowTitle">Email:</div>
                {' '}
                {email}
              </div>
              <div className="infoRow" item xs={6}>
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
