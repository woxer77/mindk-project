import React from 'react';
import * as Yup from 'yup';
import {
  Button, Typography,
} from '@mui/material';
import { useMutation } from 'react-query';
import { Field, Form, Formik } from 'formik';
import './reg.css';
import { createUser } from '../../containers/users/api/crud';

const RegForm = () => {
  const schema = Yup.object().shape({
    firstName: Yup.string().required().min(2),
    secondName: Yup.string().required().min(2),
    email: Yup.string().required().min(8).max(128),
    password: Yup.string().required().min(6).max(64),
  });

  const mutateHook = useMutation(
    (data) => createUser(data),
  );

  const onFormSubmit = async (data) => {
    alert('You have been successfully registered!');

    mutateHook.mutate(data);
  };

  return (
    <Formik
      initialValues={{
        firstName: '', secondName: '', email: '', password: '',
      }}
      onSubmit={onFormSubmit}
      validationSchema={schema}
    >
      {({ errors, handleSubmit }) => (
        <Form onSubmit={handleSubmit} className="reg-form">
          { console.log(JSON.stringify(errors)) }
          <Typography variant="h6" gutterBottom component="div" className="modalText">
            Enter your first name
          </Typography>
          <Field
            name="firstName"
            type="name"
          />
          <Typography variant="h6" gutterBottom component="div" className="modalText">
            Enter your second name
          </Typography>
          <Field
            name="secondName"
            type="name"
          />
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
          <Button variant="contained" type="submit">Register</Button>
        </Form>
      )}
    </Formik>
  );
};

export default RegForm;
