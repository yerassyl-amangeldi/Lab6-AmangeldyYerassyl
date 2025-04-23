import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../api/axiosConfig';
import { mockComments } from '../mockData';

export const fetchComments = createAsyncThunk('comments/fetchComments', async (postId, { rejectWithValue }) => {
  try {
    const response = await api.get(`/comments?postId=${postId}`);
    return response.data;
  } catch (error) {
    console.error('Ошибка загрузки комментариев, используем мок-данные:', error);
    return rejectWithValue(mockComments.filter(comment => comment.postId === parseInt(postId)));
  }
});

export const addComment = createAsyncThunk('comments/addComment', async (comment) => {
  const response = await api.post('/comments', comment);
  return { ...comment, id: Date.now() };
});

export const deleteComment = createAsyncThunk('comments/deleteComment', async (commentId) => {
  await api.delete(`/comments/${commentId}`);
  return commentId;
});

const commentsSlice = createSlice({
  name: 'comments',
  initialState: {
    comments: [],
    loading: false,
    error: null,
  },
  reducers: {
    clearComments: (state) => {
      state.comments = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchComments.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchComments.fulfilled, (state, action) => {
        state.loading = false;
        state.comments = Array.isArray(action.payload) ? action.payload : mockComments;
      })
      .addCase(fetchComments.rejected, (state, action) => {
        state.loading = false;
        if (action.payload) {
          state.comments = action.payload;
          state.error = 'Не удалось загрузить комментарии с сервера. Используются тестовые данные.';
        } else {
          state.error = action.error.message;
        }
      })
      .addCase(addComment.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addComment.fulfilled, (state, action) => {
        state.loading = false;
        state.comments.push(action.payload);
      })
      .addCase(addComment.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(deleteComment.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteComment.fulfilled, (state, action) => {
        state.loading = false;
        state.comments = state.comments.filter((comment) => comment.id !== action.payload);
      })
      .addCase(deleteComment.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const { clearComments } = commentsSlice.actions;
export default commentsSlice.reducer;