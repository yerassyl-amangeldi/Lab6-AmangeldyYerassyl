import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../api/axiosConfig';
import { mockPosts } from '../mockData'; // Импортируем мок-данные

export const fetchPosts = createAsyncThunk('posts/fetchPosts', async (_, { rejectWithValue }) => {
  try {
    const response = await api.get('/posts');
    return response.data;
  } catch (error) {
    console.error('Ошибка загрузки постов, используем мок-данные:', error);
    return rejectWithValue(mockPosts); // Возвращаем мок-данные в случае ошибки
  }
});

const postsSlice = createSlice({
  name: 'posts',
  initialState: {
    posts: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPosts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPosts.fulfilled, (state, action) => {
        state.loading = false;
        state.posts = Array.isArray(action.payload) ? action.payload : mockPosts;
      })
      .addCase(fetchPosts.rejected, (state, action) => {
        state.loading = false;
        if (action.payload) {
          state.posts = action.payload; // Используем мок-данные
          state.error = 'Не удалось загрузить посты с сервера. Используются тестовые данные.';
        } else {
          state.error = action.error.message;
        }
      });
  },
});

export default postsSlice.reducer;