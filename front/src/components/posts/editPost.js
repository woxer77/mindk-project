import React, { useState } from 'react';
import { useFormik } from 'formik';
import { useMutation } from 'react-query';
import * as Yup from 'yup';
import {
  Button,
  TextField,
  Typography,
  Autocomplete,
  Box,
  Modal,
} from '@mui/material';
import Cropper from 'react-cropper';
import { serialize } from 'object-to-formdata';
import dataURLtoBlob from 'blueimp-canvas-to-blob';
import PropTypes from 'prop-types';
import { editPost } from '../../containers/posts/api/crud';
import postsProps from '../../PropTypes/postsProps';
import { maxUploadImageSize, fileTypeImage, appPort } from '../../config/config';

export function EditPost({
  post, options, defaultLabel,
}) {
  const [image, setImage] = useState();
  const [croppedImage, setCroppedImage] = useState();
  const [cropper, setCropper] = useState();
  const [isModalOpen, setIsModalOpen] = useState(false);

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
    (data) => editPost(post.postId, data),
  );

  const onFormSubmit = (data) => {
    alert('Post was edited successfully!');

    const formData = serialize({
      text: data.text,
      availability: data.availability,
      creatorId: data.creatorId,
    }, { indices: true });

    if (croppedImage) formData.append('image', dataURLtoBlob(croppedImage));

    mutateHook.mutate(formData);
  };

  const formik = useFormik({
    initialValues: {
      availability: post.availability,
      creatorId: post.creatorId,
      text: post.text,
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
              Edit post №
              {post.postId}
            </Typography>
            <Typography variant="h6" gutterBottom component="div" className="modalText">
              Enter ID of the post creator in the field below:
            </Typography>
            <TextField
              id="outlined-basic"
              name="creatorId"
              label="Creator ID"
              variant="outlined"
              onChange={formik.handleChange}
              value={formik.values.creatorId}
              className="modalAlignCenter"
            />
            <Typography variant="h6" gutterBottom component="div" className="modalText">
              Select post availability:
            </Typography>
            <Autocomplete
              sx={{
                width: '300px',
                margin: '0 auto',
              }}
              defaultValue={{
                value: formik.values.availability,
                label: defaultLabel,
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
            <Typography variant="h6" gutterBottom component="div" className="modalText">
              Enter text of the post in the field below:
            </Typography>
            <TextField
              name="text"
              id="outlined-multiline-static"
              label="Text"
              multiline
              rows={5}
              placeholder="Your post text..."
              style={{
                width: 350,
                marginBottom: '10px',
              }}
              onChange={formik.handleChange}
              value={formik.values.text}
              className="modalAlignCenter"
            />
            <Typography variant="h6" gutterBottom component="div" className="modalText">
              Choose image:
            </Typography>
            {post.image && (
              <img src={`http://localhost:${appPort}/posts/${post.postId}/image`} alt="" width={300} />
            )}
            <Box width="600px" margin="0 auto">
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
            <br />
            <Button variant="outlined" type="submit" className="modalAlignCenter">Edit post</Button>
          </form>
        </Box>
      </Modal>
    </>
  );
}

EditPost.propTypes = postsProps;
EditPost.propTypes = {
  options: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
    }),
  ).isRequired,
  defaultLabel: PropTypes.string.isRequired,
};
