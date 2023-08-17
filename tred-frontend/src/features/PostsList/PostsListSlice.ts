import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';
import { createPost, fetchPosts } from './PostsListThunk';
import { ApiPost } from '../../type';


interface PostsState {
  posts: ApiPost[];
  fetchLoading: boolean;
  createLoading: boolean;
}

const initialState: PostsState = {
  posts: [],
  fetchLoading: false,
  createLoading: false,
}

export const PostsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchPosts.pending, (state) => {
      state.fetchLoading = true;
    });
    builder.addCase(fetchPosts.fulfilled, (state, {payload: posts}) => {
      state.fetchLoading = false;
      state.posts = posts;
    });
    builder.addCase(fetchPosts.rejected, (state) => {
      state.fetchLoading = false;
    });
    builder.addCase(createPost.pending, (state) => {
      state.createLoading = true;
    });
    builder.addCase(createPost.fulfilled, (state) => {
      state.createLoading = false;
    });
    builder.addCase(createPost.rejected, (state) => {
      state.createLoading = false;
    });
  }
});

export const postsReducer = PostsSlice.reducer;

export const selectPosts = (state: RootState) => state.posts.posts;
export const selectPostsFetching = (state: RootState) => state.posts.fetchLoading;
export const selectPostsCreating = (state: RootState) => state.posts.createLoading;