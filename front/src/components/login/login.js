import React, { useContext } from 'react';
import * as Yup from 'yup';
import {
  Button, Typography,
} from '@mui/material';
import { useMutation } from 'react-query';
import { Field, Form, Formik } from 'formik';
import './login.css';
import { loginUser } from '../../containers/auth/api/crud';
import authContext from '../../contexts/authContext';

const LoginForm = () => {
  const schema = Yup.object().shape({
    email: Yup.string().required().min(8).max(128),
    password: Yup.string().required().min(6).max(64),
  });

  const { mutate: login } = useMutation(['login'], (data) => loginUser(data));
  const { setUserData } = useContext(authContext);

  const onFormSubmit = async (data) => {
    const result = await login(data);

    if (result?.user) {
      setUserData({
        authenticated: true,
        user: result?.user,
      });

      alert('You have successfully logged in!');
    }
  };

  return (
    <Formik
      initialValues={{
        email: '', password: '',
      }}
      onSubmit={onFormSubmit}
      validationSchema={schema}
    >
      {({ errors, handleSubmit }) => (
        <Form onSubmit={handleSubmit} className="reg-form">
          { console.log(JSON.stringify(errors)) }
          <Typography variant="h6" gutterBottom component="div" className="modalText">
            Enter email
          </Typography>
          <Field
            name="email"
            type="name"
          />
          <Typography variant="h6" gutterBottom component="div" className="modalText">
            Enter password
          </Typography>
          <Field
            name="password"
            type="name"
          />
          <Button variant="contained" type="submit">Login in</Button>
        </Form>
      )}
    </Formik>
  );
};

export default LoginForm;
