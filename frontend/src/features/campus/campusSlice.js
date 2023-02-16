import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import campusService from './campusService';

const initialState = {
  campus: {},
  isLoading: false,
  isError: false,
  isSuccess: false,
  message: '',
};

// Get campus
export const getCampus = createAsyncThunk(
  'campus/get',
  async (id, thunkAPI) => {
    try {
      return await campusService.getCampus(id);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const campusSlice = createSlice({
  name: 'campus',
  initialState,
  reducers: {
    reset: (state) => {
      state.campus = {};
      state.isLoading = false;
      state.isError = false;
      state.isSuccess = false;
      state.message = '';
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getCampus.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getCampus.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.campus = action.payload;
      })
      .addCase(getCampus.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      });
  },
});

export const { reset } = campusSlice.actions;

export default campusSlice.reducer;
