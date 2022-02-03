import React from 'react';
import { useFormik } from 'formik';
import { useMutation } from 'react-query';
import * as Yup from 'yup';
import {
  Button, FormControl, InputLabel, Select, MenuItem, TextField, TextareaAutosize,
} from '@mui/material';
import { createPost } from '../../containers/posts/api/crud';

export function AddPost() {
  const schema = Yup.object().shape({
    creatorId: Yup.number().required().positive().integer(),
    availability: Yup.string().required(),
    text: Yup.string().required(),
  });

  const mutateHook = useMutation(
    (data) => createPost(data),
  );

  const onFormSubmit = (formData) => {
    formData.creationDate = new Date().toLocaleDateString();
    formData.creationTime = new Date().toLocaleTimeString();

    alert('Post was added successfully!');
    mutateHook.mutate(formData);
  };

  const formik = useFormik({
    initialValues: {
      availability: 'for all',
    },
    validationSchema: schema,
    onSubmit: (data) => onFormSubmit(data),
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <p>
        Enter the ID of the post creator in the field below:
      </p>
      <TextField
        id="outlined-basic"
        name="creatorId"
        label="Creator ID"
        variant="outlined"
        onChange={formik.handleChange}
      />
      <p>
        Select post availability:
      </p>
      <FormControl sx={{ m: 1, minWidth: 120 }}>
        <InputLabel id="demo-simple-select-autowidth-label">Availability</InputLabel>
        <Select
          id="demo-simple-select-autowidth"
          labelId="demo-simple-select-autowidth-label"
          name="availability"
          label="Availability"
          onChange={formik.handleChange}
          value={formik.values.availability}
        >
          <MenuItem value="for all">For all</MenuItem>
          <MenuItem value="for friends">For friends</MenuItem>
          <MenuItem value="for me">For me</MenuItem>
        </Select>
      </FormControl>
      <p>
        Enter the text of the post in the field below:
      </p>
      <TextareaAutosize
        name="text"
        aria-label="minimum height"
        minRows={4}
        placeholder="Your post text..."
        style={{
          width: 200,
          marginBottom: '10px',
        }}
        onChange={formik.handleChange}
      />
      <br />
      <Button variant="outlined" type="submit">Add the post</Button>
    </form>
  );
}
