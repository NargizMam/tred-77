import React, { useCallback, useEffect } from 'react';
import { Grid, Typography } from '@mui/material';
import PostsForm from './components/PostsForm';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { selectPosts, selectPostsFetching } from './PostsListSlice';
import Spinner from '../../components/UI/Spinner/Spinner';
import { fetchPosts } from './PostsListThunk';
import PostItem from './components/PostsItem';

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

  const onePost = posts.map(post => (
    <PostItem
      key={post.id}
      image={post.image}
      message={post.message}
      author={post.author}
      datetime={post.datetime}
    />
  ));
  return (
    <>
      <Grid container spacing={2}>
        <Grid item xs={4}>
          <PostsForm/>
        </Grid>
        <Grid item xs={8}>
          <Typography>
            All posts
          </Typography>
          {fetching && <Spinner/>}
          {onePost}
        </Grid>
      </Grid>
    </>
  );
};

export default PostsList;

