import React, { useCallback, useEffect } from 'react';
import { Grid, Typography } from '@mui/material';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { selectPosts, selectPostsFetching } from './PostsListSlice';
import Spinner from '../../components/UI/Spinner/Spinner';
import { fetchPosts } from './PostsListThunk';

const PostsList = () => {
  const dispatch = useAppDispatch();
  const posts = useAppSelector(selectPosts);
  const fetching = useAppSelector(selectPostsFetching);

  useEffect(() => {
    dispatch(fetchPosts());
    setInterval(fetchPostsList,5000);
  }, [fetchPosts]);

  const fetchPostsList = useCallback(async () => {
    dispatch(fetchPosts());
  }, [dispatch]);


  return (
    <>
      <Grid container spacing={2}>
        <Grid item xs={4}>
        </Grid>
        <Grid item xs={8}>
          <Typography>
            All posts
          </Typography>
          {fetching && <Spinner/>}
        </Grid>
      </Grid>
    </>
  );
};

export default PostsList;

