import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/auth/authSlice';
import campusReducer from '../features/campus/campusSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    campuses: campusReducer,
  },
});
