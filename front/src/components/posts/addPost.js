import React from 'react';
import { useFormik } from 'formik';
import { useMutation } from 'react-query';
import * as Yup from 'yup';
import {
  Button, FormControl, InputLabel, Select, MenuItem, TextField, TextareaAutosize, Typography,
} from '@mui/material';
import { createPost } from '../../containers/posts/api/crud';

export function AddPost({
  currentDate, currentTime,
}) {
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

  const onFormSubmit = (formData) => {
    formData.creationDate = currentDate;
    formData.creationTime = currentTime;

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
      <div>{JSON.stringify(formik.errors)}</div>
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
      <br />
      <Button variant="outlined" type="submit">Add the post</Button>
    </form>
  );
}
