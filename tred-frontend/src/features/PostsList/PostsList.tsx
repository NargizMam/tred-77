import React, { useCallback, useEffect } from 'react';
import { Grid, Typography } from '@mui/material';
import PostsForm from './components/PostsForm';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { selectPosts, selectPostsFetching } from './PostsListSlice';
import Spinner from '../../components/UI/Spinner/Spinner';
import { fetchPosts } from './PostsListThunk';
import PostItem from "./components/PostsItem";
import {ApiPost} from "../../type";

const PostsList = () => {
  const dispatch = useAppDispatch();
  const posts = useAppSelector<ApiPost[]>(selectPosts);
  const fetching = useAppSelector(selectPostsFetching);

  useEffect(() => {
    dispatch(fetchPosts());
    setInterval(fetchPostsList,5000);
  }, [fetchPosts, dispatch]);

  const fetchPostsList = useCallback(async () => {
    dispatch(fetchPosts());
  }, [dispatch]);
  let onePost;
  if(posts){
    onePost = posts.map(post => (
        <PostItem
            key={post.id}
            image={post.image}
            message={post.message}
            author={post.author}
            datetime={post.datetime}
        />
    ));
  }else{
    onePost = <h1>Создайте пост</h1>
  }

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
          {fetching && posts === null && <Spinner/>}
          {onePost}
        </Grid>
      </Grid>
    </>
  );
};

export default PostsList;

