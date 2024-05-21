import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '../../utils/axios';

export const fetchTasks = createAsyncThunk('tasks/fetch', async () => {
  const response = await axiosInstance.get('/tasks');
  return response.data;
});

export const createTask = createAsyncThunk('tasks/create', async (taskData) => {
  const response = await axiosInstance.post('/tasks', taskData);
  return response.data;
});

const taskSlice = createSlice({
  name: 'tasks',
  initialState: { tasks: [], loading: false, error: null },
  extraReducers: {
    [fetchTasks.pending]: (state) => {
      state.loading = true;
    },
    [fetchTasks.fulfilled]: (state, action) => {
      state.loading = false;
      state.tasks = action.payload;
    },
    [fetchTasks.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    },
    [createTask.pending]: (state) => {
      state.loading = true;
    },
    [createTask.fulfilled]: (state, action) => {
      state.loading = false;
      state.tasks.push(action.payload);
    },
    [createTask.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    },
  },
});

export default taskSlice.reducer;
