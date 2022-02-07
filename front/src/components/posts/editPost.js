import React from 'react';
import { useFormik } from 'formik';
import { useMutation } from 'react-query';
import * as Yup from 'yup';
import {
  Button, FormControl, InputLabel, MenuItem, Select, TextareaAutosize, TextField, Typography,
} from '@mui/material';
import { editPost } from '../../containers/posts/api/crud';
import postsProps from '../../PropTypes/postsProps';

export function EditPost({
  post,
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
    (data) => editPost(post[0].postId, data),
  );

  const onFormSubmit = (formData) => {
    alert('Post was edited successfully!');
    mutateHook.mutate(formData);
  };

  const formik = useFormik({
    initialValues: {
      availability: post[0].availability,
      creatorId: post[0].creatorId,
      text: post[0].text,
    },
    validationSchema: schema,
    onSubmit: (data) => onFormSubmit(data),
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <div>{JSON.stringify(formik.errors)}</div>
      <Typography margin="15px" variant="h6" gutterBottom component="div">
        Edit post №
        {post[0].postId}
      </Typography>
      <Typography margin="15px" variant="h6" gutterBottom component="div">
        Enter ID of the post creator in the field below:
      </Typography>
      <TextField
        id="outlined-basic"
        name="creatorId"
        label="Creator ID"
        variant="outlined"
        onChange={formik.handleChange}
        value={formik.values.creatorId}
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
        Enter text of the post in the field below:
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
        value={formik.values.text}
      />
      <br />
      <Button variant="outlined" type="submit">Edit post</Button>
    </form>
  );
}

EditPost.propTypes = postsProps;
