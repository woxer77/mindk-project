import React, { useState } from 'react';
import { useFormik } from 'formik';
import { useMutation } from 'react-query';
import * as Yup from 'yup';
import {
  Button, TextField, Typography, Autocomplete, Box,
} from '@mui/material';
import './style.css';
import PropTypes from 'prop-types';
import Cropper from 'react-cropper';
import 'cropperjs/dist/cropper.css';
import { serialize } from 'object-to-formdata';
import dataURLtoBlob from 'blueimp-canvas-to-blob';
import usersProps from '../../PropTypes/usersProps';
import { editUser } from '../../containers/users/api/crud';

export function EditUser({
  users, countries, defaultCode, defaultPhone,
}) {
  const [image, setImage] = useState();
  const [croppedImage, setCroppedImage] = useState();
  const [cropper, setCropper] = useState();

  const MAX_IMAGE_SIZE = 10000000;
  const FILE_TYPE_IMAGE = 'image.*';

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
  });

  const mutateHook = useMutation(
    (data) => editUser(users[0].userId, data),
  );

  const onFormSubmit = (data) => {
    alert('User was edited successfully!');

    const formData = serialize({
      firstName: data.firstName,
      secondName: data.secondName,
      middleName: data.middleName,
      email: data.email,
      phone: data.phone,
      country: data.country,
    }, { indices: true });

    if (croppedImage) formData.append('avatar', dataURLtoBlob(croppedImage));

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
      country: users[0].country,
    },
    validationSchema: schema,
    onSubmit: (data) => onFormSubmit(data),
  });

  const handleChange = (e) => {
    e.preventDefault();
    const file = e.target.files[0];

    if (file.type.match(FILE_TYPE_IMAGE) && file.size < MAX_IMAGE_SIZE) {
      const reader = new FileReader();
      reader.onload = () => {
        setImage(reader.result);
      };
      reader.readAsDataURL(file);
    } else {
      console.error('Wrong file format or size!');
    }
  };

  const cropImage = () => {
    if (typeof cropper !== 'undefined') {
      setCroppedImage(cropper.getCroppedCanvas().toDataURL());
      setImage(null);
    }
  };

  const deleteImage = () => {
    setCroppedImage(null);
    setImage(null);
  };

  return (
    <form onSubmit={formik.handleSubmit}>
      { console.log(JSON.stringify(formik.errors)) }
      <Typography variant="h6" gutterBottom component="div">
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
        Choose image:
      </Typography>
      {users[0].avatar && (
        <img src={`http://localhost:2001/users/${users[0].userId}/avatar`} alt="" width={300} />
      )}
      <Box width="600px" margin="0 auto">
        {!image && (
          <Button variant="contained" component="label">
            Edit image
            <input type="file" hidden onChange={handleChange} />
          </Button>
        )}
        {image && <Button variant="contained" onClick={deleteImage}>Delete image</Button>}
        {image && (
          <Cropper
            src={image}
            onInitialized={(instance) => setCropper(instance)}
            rotatable={false}
            viewMode={1}
            minCropBoxWidth={100}
            minCropBoxHeight={100}
            autoCropArea={1}
          />
        )}
        {image && (
          <Button variant="contained" onClick={cropImage}>Crop</Button>
        )}
      </Box>
      <Typography margin="15px" variant="h6" gutterBottom component="div">
        Choose your country:
      </Typography>
      <Autocomplete
        id="country-select-demo"
        sx={{
          width: '300px',
          margin: '0 auto',
        }}
        defaultValue={{
          code: defaultCode,
          label: formik.values.country,
          phone: defaultPhone,
        }}
        options={countries}
        autoHighlight
        getOptionLabel={(option) => option.label}
        onChange={(_, country) => {
          if (country !== null) formik.setFieldValue('country', `${country.label}`);
          else formik.setFieldValue('country', '');
        }}
        renderOption={(props, option) => (
          <Box component="li" sx={{ '& > img': { mr: 2, flexShrink: 0 } }} {...props}>
            <img
              loading="lazy"
              width="20"
              src={`https://flagcdn.com/w20/${option.code.toLowerCase()}.png`}
              srcSet={`https://flagcdn.com/w40/${option.code.toLowerCase()}.png 2x`}
              alt=""
            />
            {option.label}
            {' '}
            (
            {option.code}
            ) +
            {option.phone}
          </Box>
        )}
        renderInput={(params) => (
          <TextField
            {...params}
            onChange={formik.handleChange}
            label="Choose a country"
          />
        )}
      />
      {' '}
      <br />
      <Button variant="outlined" type="submit">Edit user</Button>
    </form>
  );
}

EditUser.propTypes = usersProps;
EditUser.propTypes = {
  countries: PropTypes.arrayOf(
    PropTypes.shape({
      code: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
      phone: PropTypes.string.isRequired,
    }),
  ).isRequired,
  defaultCode: PropTypes.string.isRequired,
  defaultPhone: PropTypes.string.isRequired,
};

EditUser.defaultProps = {
  users: PropTypes.arrayOf(
    PropTypes.shape({
      avatar: null,
    }),
  ),
};
