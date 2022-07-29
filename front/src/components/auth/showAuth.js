import React, { useCallback, useState } from 'react';
import GoogleLogin from 'react-google-login';
import axios from 'axios';
import {
  Box, Typography,
} from '@mui/material';
import { appPort, googleClientId } from '../../configs/config';

export default function ShowAuth() {
  const decodeTokenToUserObj = (token) => {
    if (token) return JSON.parse(Buffer.from(token.split('.')[1], 'base64'));
    return null;
  };

  const [googleAuthInfo, setGoogleAuthInfo] = useState({});

  const googleAuth = useCallback((data) => {
    axios.post(`http://localhost:${appPort}/auth/google`, {
      access_token: data.accessToken,
    })
      .then((response) => {
        console.log('before set');
        setGoogleAuthInfo({
          accessToken: response.data.accessToken,
          refreshToken: response.data.refreshToken,
          user: decodeTokenToUserObj(response.data.accessToken),
        });
        console.log('log');
      })
      .catch((error) => {
        console.log(error);
      });
  });
  if (!googleAuthInfo.user) {
    return (
      <>
        <Typography variant="h6" margin="5px">Authorization with Google OAuth 2.0</Typography>
        <GoogleLogin
          clientId={googleClientId}
          onSuccess={googleAuth}
          onFailure={(errors) => {
            console.log(errors);
          }}
          cookiePolicy="single_host_origin"
        />
      </>
    );
  }

  return (
    <Box>
      <Typography
        variant="h6"
        margin={1}
      >
        Hello
      </Typography>
      <Typography
        variant="h5"
        margin={2}
      >
        {`${googleAuthInfo.user.secondName} ${googleAuthInfo.user.firstName} [${googleAuthInfo.user.userId} ID]`}
      </Typography>
      <Typography
        variant="h6"
        margin={1}
      >
        You are successfully authorized using Google OAuth 2.0
      </Typography>
    </Box>
  );
}
