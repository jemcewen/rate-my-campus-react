import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import campusService from './campusService';

const initialState = {
  campuses: [],
  isLoading: false,
  isError: false,
  isSuccess: false,
  message: '',
};

// Create new campus
export const createCampus = createAsyncThunk(
  'campuses/create',
  async (campusData, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await campusService.createCampus(campusData, token);
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
      state.isLoading = false;
      state.isError = false;
      state.isSuccess = false;
      state.message = '';
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createCampus.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createCampus.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.campuses.push(action.payload);
      })
      .addCase(createCampus.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      });
  },
});

export const { reset } = campusSlice.actions;

export default campusSlice.reducer;
