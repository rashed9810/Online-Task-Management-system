import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '../../utils/axios';

// Async thunk for registering a user
export const registerUser = createAsyncThunk('user/register', async (userData, { rejectWithValue }) => {
  try {
    const response = await axiosInstance.post('/users/register', userData);
    return response.data;
  } catch (err) {
    return rejectWithValue(err.response.data);
  }
});

// Async thunk for logging in a user
export const loginUser = createAsyncThunk('user/login', async (userData, { rejectWithValue }) => {
  try {
    const response = await axiosInstance.post('/users/login', userData);
    return response.data;
  } catch (err) {
    return rejectWithValue(err.response.data);
  }
});

const userSlice = createSlice({
  name: 'user',
  initialState: { userInfo: null, loading: false, error: null },
  reducers: {
    logout: (state) => {
      state.userInfo = null;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.loading = false;
        state.userInfo = action.payload;
        state.error = null;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.userInfo = action.payload;
        state.error = null;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { logout } = userSlice.actions;
export default userSlice.reducer;
