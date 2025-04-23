import { configureStore } from '@reduxjs/toolkit';
import postsReducer from './postsSlice.js';
import commentsReducer from './commentsSlice';

export const store = configureStore({
  reducer: {
    posts: postsReducer,
    comments: commentsReducer,
  },
});