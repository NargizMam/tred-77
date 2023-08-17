import { createAsyncThunk } from '@reduxjs/toolkit';
import { ApiPost, PostMutation } from '../../type';
import axiosApi from '../../axiosApi';

export const fetchPosts = createAsyncThunk<ApiPost[]>(
  'posts/fetchAll',
  async () => {
    const dishesResponse = await axiosApi.get<ApiPost[]>('/posts');
    return dishesResponse.data;
  }
);
export const createPost = createAsyncThunk<void, PostMutation>(
  'posts/create',
  async (postMutation) => {
    const formData = new FormData();

    const keys = Object.keys(postMutation) as (keyof PostMutation)[];
    keys.forEach(key => {
      const value = postMutation[key];

      if (value !== null) {
        formData.append(key, value);
      }
    });
    await axiosApi.post('/posts', formData);
  }
);