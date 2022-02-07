import React from 'react';

import './style.css';
import {
  Box,
} from '@mui/material';
import profileProps from '../../PropTypes/profileProps';
import defaultProfileProps from '../../PropTypes/profileDefaultProps';

const Profile = ({
  fullName, birthDate, placeOfBirth, educationPlace, phoneNumber, user,
}) => (
  <Box sx={{ width: '50%' }} className="profileContainer">
    <p>
      Name:
      {fullName}
    </p>
    <p>
      Birthday:
      {birthDate}
    </p>
    <p>
      Place of birth:
      {placeOfBirth}
    </p>
    <p>
      Place of study:
      {educationPlace}
    </p>
    <p>
      Phone:
      {phoneNumber}
    </p>
    <p>
      UserObject:
      <br />
      {JSON.stringify(user)}
    </p>
  </Box>
);

Profile.propTypes = profileProps;
Profile.defaultProps = defaultProfileProps;

export default Profile;
