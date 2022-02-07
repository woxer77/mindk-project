import React from 'react';
import { useFormik } from 'formik';
import { useMutation } from 'react-query';
import * as Yup from 'yup';
import {
  Button, TextField, Typography, Alert,
} from '@mui/material';
import './style.css';
import PropTypes from 'prop-types';
import usersProps from '../../PropTypes/usersProps';
import { editUser } from '../../containers/users/api/crud';

export function EditUser({
  users,
}) {
  const schema = Yup.object().shape({
    firstName: Yup.string()
      .matches(/^[A-Za-z ]*$/, 'Only uppercase and lowercase Latin letters are allowed')
      .min(2, 'The minimum allowed number of characters is 2')
      .max(32, 'The maximum allowed number of characters is 32')
      .required('The field is required to be filled'),
    secondName: Yup.string()
      .matches(/^[A-Za-z ]*$/, 'Only uppercase and lowercase Latin letters are allowed')
      .min(2, 'The minimum allowed number of characters is 2')
      .max(64, 'The maximum allowed number of characters is 64')
      .required('The field is required to be filled'),
    middleName: Yup.string()
      .matches(/^[A-Za-z ]*$/, 'Only uppercase and lowercase Latin letters are allowed')
      .min(2, 'The minimum allowed number of characters is 2')
      .max(32, 'The maximum allowed number of characters is 32')
      .required('The field is required to be filled'),
    email: Yup.string()
      .email('Invalid email address format')
      .max(128, 'The maximum allowed number of characters is 128')
      .required('The field is required to be filled'),
    phone: Yup.string()
      .matches(/^\+380\d{9}$/, 'Invalid phone number format')
      .required('The field is required to be filled'),
    avatar: Yup.string()
      .max(64, 'The maximum allowed number of characters is 64')
      .required('The field is required to be filled'),
  });

  const mutateHook = useMutation(
    (data) => editUser(users[0].userId, data),
  );

  const onFormSubmit = (formData) => {
    alert('User was edited successfully!');
    mutateHook.mutate(formData);
  };

  const formik = useFormik({
    initialValues: {
      firstName: users[0].firstName,
      secondName: users[0].secondName,
      middleName: users[0].middleName,
      email: users[0].email,
      phone: users[0].phone,
      avatar: users[0].avatar,
    },
    validationSchema: schema,
    onSubmit: (data) => onFormSubmit(data),
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <div>{JSON.stringify(formik.errors)}</div>
      <Typography margin="15px" variant="h6" gutterBottom component="div">
        Edit user №
        {users[0].userId}
      </Typography>
      <Typography margin="15px" variant="h6" gutterBottom component="div">
        Enter first name:
      </Typography>
      <TextField
        id="outlined-basic"
        name="firstName"
        label="First name"
        variant="outlined"
        onChange={formik.handleChange}
        value={formik.values.firstName}
      />
      <Typography margin="15px" variant="h6" gutterBottom component="div">
        Enter second name:
      </Typography>
      <TextField
        id="outlined-basic"
        name="secondName"
        label="Second name"
        variant="outlined"
        onChange={formik.handleChange}
        value={formik.values.secondName}
      />
      <Typography margin="15px" variant="h6" gutterBottom component="div">
        Enter middle name:
      </Typography>
      <TextField
        id="outlined-basic"
        name="middleName"
        label="Middle name"
        variant="outlined"
        onChange={formik.handleChange}
        value={formik.values.middleName}
      />
      <Typography margin="15px" variant="h6" gutterBottom component="div">
        Enter email:
      </Typography>
      <TextField
        id="outlined-basic"
        name="email"
        label="Email"
        variant="outlined"
        onChange={formik.handleChange}
        value={formik.values.email}
      />
      <Typography margin="15px" variant="h6" gutterBottom component="div">
        Enter phone number:
      </Typography>
      <TextField
        id="outlined-basic"
        name="phone"
        label="Phone number"
        variant="outlined"
        onChange={formik.handleChange}
        value={formik.values.phone}
      />
      <Typography margin="15px" variant="h6" gutterBottom component="div">
        Enter the path to the avatar:
      </Typography>
      <TextField
        id="outlined-basic"
        name="avatar"
        label="Avatar path"
        variant="outlined"
        onChange={formik.handleChange}
        value={formik.values.avatar}
      />
      <br />
      {' '}
      <br />
      <Button variant="outlined" type="submit">Edit user</Button>
    </form>
  );
}

EditUser.propTypes = usersProps;

EditUser.defaultProps = {
  user: PropTypes.arrayOf(
    PropTypes.shape({
      avatar: null,
    }),
  ),
};
