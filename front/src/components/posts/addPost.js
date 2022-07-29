import React, { useState } from 'react';
import { useFormik } from 'formik';
import { useMutation } from 'react-query';
import * as Yup from 'yup';
import {
  Button, TextField, Typography, Autocomplete, Box,
} from '@mui/material';
import { serialize } from 'object-to-formdata';
import Cropper from 'react-cropper';
import dataURLtoBlob from 'blueimp-canvas-to-blob';
import PropTypes from 'prop-types';
import { createPost } from '../../containers/posts/api/crud';
import { maxUploadImageSize, fileTypeImage } from '../../configs/config';

export default function AddPost({
  currentDate, currentTime,
}) {
  const [image, setImage] = useState();
  const [croppedImage, setCroppedImage] = useState();
  const [cropper, setCropper] = useState();

  const schema = Yup.object().shape({
    creatorId: Yup.number()
      .required('The field is required to be filled')
      .positive('The field must be filled with a positive number')
      .integer('The field must be filled with an integer'),
    availability: Yup.string()
      .required('The field is required to be filled'),
    text: Yup.string()
      .required('The field is required to be filled'),
  });

  const mutateHook = useMutation(
    (data) => createPost(data),
  );

  const onFormSubmit = (data) => {
    alert('Post was added successfully!');

    const formData = serialize({
      text: data.text,
      creationDate: currentDate(),
      creationTime: currentTime(),
      availability: data.availability,
      creatorId: data.creatorId,
    }, { indices: true });

    if (croppedImage) formData.append('image', dataURLtoBlob(croppedImage));

    mutateHook.mutate(formData);
  };

  const options = [
    { value: 'for all', label: 'All' },
    { value: 'for friends', label: 'Friends' },
    { value: 'for me', label: 'Me' },
  ];

  const formik = useFormik({
    initialValues: {
      availability: 'for all',
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

  return (
    <form onSubmit={formik.handleSubmit}>
      { console.log(JSON.stringify(formik.errors)) }
      <Typography margin="15px" variant="h6" gutterBottom component="div">
        Enter the ID of the post creator in the field below:
      </Typography>
      <TextField
        id="outlined-basic"
        name="creatorId"
        label="Creator ID"
        variant="outlined"
        onChange={formik.handleChange}
      />
      <Typography margin="15px" variant="h6" gutterBottom component="div">
        Select post availability:
      </Typography>
      <Autocomplete
        sx={{
          width: '300px',
          margin: '0 auto',
        }}
        defaultValue={{
          value: formik.values.availability,
          label: options[0].label,
        }}
        options={options}
        getOptionLabel={(option) => option.label}
        onChange={(_, availability) => {
          if (availability !== null) formik.setFieldValue('availability', `${availability.value}`);
          else formik.setFieldValue('availability', '');
        }}
        renderInput={(params) => (
          <TextField
            {...params}
            label="Availability for"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
        )}
      />
      <Typography margin="15px" variant="h6" gutterBottom component="div">
        Enter the text of the post in the field below:
      </Typography>
      <TextField
        name="text"
        id="outlined-multiline-static"
        label="Multiline"
        multiline
        rows={5}
        placeholder="Your post text..."
        style={{
          width: 350,
          marginBottom: '10px',
        }}
        onChange={formik.handleChange}
      />
      <Typography margin="15px" variant="h6" gutterBottom component="div">
        Choose image:
      </Typography>
      <Box width="600px" margin="0 auto">
        {!image && (
          <Button variant="contained" component="label">
            Choose image
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
      <br />
      <Button variant="outlined" type="submit">Add the post</Button>
    </form>
  );
}

AddPost.propTypes = {
  currentDate: PropTypes.string.isRequired,
  currentTime: PropTypes.string.isRequired,
};
