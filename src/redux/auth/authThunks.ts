import { createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '../../config/axiosInstance';
import axios from 'axios';

interface RegisterPayload {
  fullName: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export const registerUser = createAsyncThunk<
  void,                    // Return type
  RegisterPayload,         // Arg type
  { rejectValue: string }  // Rejection type
>(
  'auth/register',
  async (formData, thunkAPI) => {
    try {
      await axiosInstance.post('/auth/register', formData);
    } catch (err: unknown) {
      if (axios.isAxiosError(err)) {
        const message = err.response?.data?.message || 'Registration failed';
        return thunkAPI.rejectWithValue(message);
      }
      return thunkAPI.rejectWithValue('Unexpected error');
    }
  }
);
