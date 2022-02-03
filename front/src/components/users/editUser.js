import React from 'react';
import { useFormik } from 'formik';
import { useMutation } from 'react-query';
import * as Yup from 'yup';
import {
  Button, TextField,
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
      .matches(/^[A-Za-z ]*$/, 'Please enter valid name')
      .min(2, 'Too Short!')
      .max(32)
      .required(),
    secondName: Yup.string()
      .matches(/^[A-Za-z ]*$/, 'Please enter valid second name')
      .min(2, 'Too Short!')
      .max(64)
      .required(),
    middleName: Yup.string()
      .matches(/^[A-Za-z ]*$/, 'Please enter valid middle name')
      .min(2, 'Too Short!')
      .max(32)
      .required(),
    email: Yup.string()
      .email('Invalid email')
      .max(128)
      .required(),
    phone: Yup.string()
      .matches(/^\+380\d{9}$/)
      .required(),
    avatar: Yup.string()
      .max(64)
      .required(),
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
      <p>
        Edit user №
        {users[0].userId}
      </p>
      <p>
        Enter first name:
      </p>
      <TextField
        id="outlined-basic"
        name="firstName"
        label="First name"
        variant="outlined"
        onChange={formik.handleChange}
        value={formik.values.firstName}
      />
      <p>
        Enter second name:
      </p>
      <TextField
        id="outlined-basic"
        name="secondName"
        label="Second name"
        variant="outlined"
        onChange={formik.handleChange}
        value={formik.values.secondName}
      />
      <p>
        Enter middle name:
      </p>
      <TextField
        id="outlined-basic"
        name="middleName"
        label="Middle name"
        variant="outlined"
        onChange={formik.handleChange}
        value={formik.values.middleName}
      />
      <p>
        Enter email:
      </p>
      <TextField
        id="outlined-basic"
        name="email"
        label="Email"
        variant="outlined"
        onChange={formik.handleChange}
        value={formik.values.email}
      />
      <p>
        Enter phone number:
      </p>
      <TextField
        id="outlined-basic"
        name="phone"
        label="Phone number"
        variant="outlined"
        onChange={formik.handleChange}
        value={formik.values.phone}
      />
      <p>
        Enter the path to the avatar:
      </p>
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
