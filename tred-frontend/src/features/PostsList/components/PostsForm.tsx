import React, { useState } from 'react';
import { FormHelperText, Grid, InputLabel, TextField } from '@mui/material';
import FileInput from '../../../components/UI/FileInput/FileInput';
import { PostMutation } from '../../../type';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { createPost } from '../PostsListThunk';
import { selectPostsCreating } from '../PostsListSlice';
import { LoadingButton } from '@mui/lab';


const PostsForm = () => {
  const initialPost: PostMutation = {
    message: '',
    author: 'Аноним',
    image: null
  }
  const [postState, setPostState] = useState<PostMutation>(initialPost);
  const creating = useAppSelector(selectPostsCreating);
  const dispatch = useAppDispatch();

  const submitFormHandler = async (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(createPost(postState));

    setPostState(initialPost);
  };
  const inputChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {name, value} = e.target;
    setPostState(prevState => {
      return {...prevState, [name]: value};
    });
  };
  const fileInputChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {name, files} = e.target;
    setPostState(prevState => ({
      ...prevState,
      [name]: files && files[0] ? files[0] : null,
    }))
  };

  return (
    <form
      autoComplete="off"
      onSubmit={submitFormHandler}
    >
      <Grid container
            direction="column"
            maxWidth="xs"
            spacing={2}>
        <Grid item xs>
          <InputLabel htmlFor="my-input">Автор</InputLabel>
          <TextField
            id="my-input"
            aria-describedby="my-helper-text"
            name="author"
            onChange={inputChangeHandler}
            value={postState.author}
          />
          <FormHelperText id="my-helper-text">Вы можете отправить сообщение анонимно</FormHelperText>
        </Grid>
        <Grid item xs>
          <TextField
            multiline rows={3}
            id="message" label="Message"
            name="message"
            required
            value={postState.message}
            onChange={inputChangeHandler}
          />
        </Grid>
        <Grid item xs>
          <FileInput
            name="image"
            label="Image"
            onChange={fileInputChangeHandler}
          />
        </Grid>
        <Grid item xs>
          <LoadingButton
            type="submit"
            loading={creating}
            disabled={postState.message === ''}
            style={{marginLeft: '35px'}}
            variant="outlined">
            Create post
          </LoadingButton>
        </Grid>
      </Grid>
    </form>
  );
};

export default PostsForm;