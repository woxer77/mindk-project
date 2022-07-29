import React from 'react';

import './style.css';
import {
  Box,
} from '@mui/material';
import profileProps from '../../PropTypes/profileProps';
import defaultProfileProps from '../../PropTypes/profileDefaultProps';

export default function Profile({
  fullName, birthDate, placeOfBirth, educationPlace, phoneNumber, user,
}) {
  return (
    <Box className="profileContainer">
      <p>
        Name: {fullName}
      </p>
      <p>
        Birthday: {birthDate}
      </p>
      <p>
        Place of birth: {placeOfBirth}
      </p>
      <p>
        Place of study: {educationPlace}
      </p>
      <p>
        Phone: {phoneNumber}
      </p>
      <p>
        UserObject: {JSON.stringify(user)}
      </p>
    </Box>
  );
}

Profile.propTypes = profileProps;
Profile.defaultProps = defaultProfileProps;
