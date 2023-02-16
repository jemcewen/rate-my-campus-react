import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import reviewsService from './reviewsService';

const initialState = {
  reviews: [],
  isLoading: false,
  isError: false,
  isSuccess: false,
  message: '',
};

// Get reviews
export const getReviews = createAsyncThunk(
  'reviews/get',
  async (id, thunkAPI) => {
    try {
      return await reviewsService.getReviews(id);
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

export const reviewsSlice = createSlice({
  name: 'reviews',
  initialState,
  reducers: {
    reset: (state) => {
      state.reviews = [];
      state.isLoading = false;
      state.isError = false;
      state.isSuccess = false;
      state.message = '';
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getReviews.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getReviews.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.reviews = action.payload;
      })
      .addCase(getReviews.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      });
  },
});

export const { reset } = reviewsSlice.actions;

export default reviewsSlice.reducer;
