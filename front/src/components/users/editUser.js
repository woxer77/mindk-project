import React, { useState } from 'react';
import { useFormik } from 'formik';
import { useMutation } from 'react-query';
import * as Yup from 'yup';
import {
  Button, TextField, Typography, Autocomplete, Box, Modal,
} from '@mui/material';
import './modalStyle.css';
import PropTypes from 'prop-types';
import Cropper from 'react-cropper';
import 'cropperjs/dist/cropper.css';
import { serialize } from 'object-to-formdata';
import dataURLtoBlob from 'blueimp-canvas-to-blob';
import usersProps from '../../PropTypes/usersProps';
import { editUser } from '../../containers/users/api/crud';
import { maxUploadImageSize, fileTypeImage, appPort } from '../../configs/config';

export default function EditUser({
  users, countries, defaultCode, defaultPhone,
}) {
  const [image, setImage] = useState();
  const [croppedImage, setCroppedImage] = useState();
  const [cropper, setCropper] = useState();
  const [isModalOpen, setIsModalOpen] = useState(false);

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
    (data) => editUser(users.userId, data),
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
      firstName: users.firstName,
      secondName: users.secondName,
      middleName: users.middleName,
      email: users.email,
      phone: users.phone,
      avatar: users.avatar,
      country: users.country,
    },
    validationSchema: schema,
    onSubmit: (data) => onFormSubmit(data),
  });

  const handleChange = (e) => {
    e.preventDefault();
    const file = e.target.files[0];

    if (file.type.match(fileTypeImage) && file.size < maxUploadImageSize) {
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

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <>
      <Button variant="contained" onClick={openModal}>Open modal</Button>
      <Modal
        open={isModalOpen}
        onClose={closeModal}
        className="modalStyle"
      >
        <Box className="boxStyle">
          <form onSubmit={formik.handleSubmit}>
            { console.log(JSON.stringify(formik.errors)) }
            <Typography variant="h6" gutterBottom component="div" className="modalText">
              Edit user №
              {users.userId}
            </Typography>
            <Typography variant="h6" gutterBottom component="div" className="modalText">
              Enter first name:
            </Typography>
            <TextField
              id="outlined-basic"
              name="firstName"
              label="First name"
              variant="outlined"
              onChange={formik.handleChange}
              value={formik.values.firstName}
              className="modalAlignCenter"
            />
            <Typography variant="h6" gutterBottom component="div" className="modalText">
              Enter second name:
            </Typography>
            <TextField
              id="outlined-basic"
              name="secondName"
              label="Second name"
              variant="outlined"
              onChange={formik.handleChange}
              value={formik.values.secondName}
              className="modalAlignCenter"
            />
            <Typography variant="h6" gutterBottom component="div" className="modalText">
              Enter middle name:
            </Typography>
            <TextField
              id="outlined-basic"
              name="middleName"
              label="Middle name"
              variant="outlined"
              onChange={formik.handleChange}
              value={formik.values.middleName}
              className="modalAlignCenter"
            />
            <Typography variant="h6" gutterBottom component="div" className="modalText">
              Enter email:
            </Typography>
            <TextField
              id="outlined-basic"
              name="email"
              label="Email"
              variant="outlined"
              onChange={formik.handleChange}
              value={formik.values.email}
              className="modalAlignCenter"
            />
            <Typography variant="h6" gutterBottom component="div" className="modalText">
              Enter phone number:
            </Typography>
            <TextField
              id="outlined-basic"
              name="phone"
              label="Phone number"
              variant="outlined"
              onChange={formik.handleChange}
              value={formik.values.phone}
              className="modalAlignCenter"
            />
            <Typography variant="h6" gutterBottom component="div" className="modalText">
              Choose image:
            </Typography>
            {users.avatar && (
              <img src={`http://localhost:${appPort}/users/${users.userId}/avatar`} alt="" width={300} />
            )}
            <Box width="600px">
              {!image && (
                <Button variant="contained" component="label" className="modalAlignCenter">
                  Edit image
                  <input type="file" hidden onChange={handleChange} />
                </Button>
              )}
              {image && <Button variant="contained" className="modalAlignCenter" onClick={deleteImage}>Delete image</Button>}
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
                <Button variant="contained" className="modalAlignCenter" onClick={cropImage}>Crop</Button>
              )}
            </Box>
            <Typography variant="h6" gutterBottom component="div" className="modalText">
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
            <Button variant="outlined" type="submit" className="modalAlignCenter">Edit user</Button>
          </form>
        </Box>
      </Modal>
    </>
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
