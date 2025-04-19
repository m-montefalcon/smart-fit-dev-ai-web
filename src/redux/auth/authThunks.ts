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

export const loginUser = createAsyncThunk<
  void,                  
  { email: string; password: string },        
  { rejectValue: string } 
>(
  'auth/login',
  async (formData, thunkAPI) => {
    try {
      await axiosInstance.post('/auth/login', formData);
    } catch (err: unknown) {
      if (axios.isAxiosError(err)) {
        const message = err.response?.data?.message || 'Login failed';
        return thunkAPI.rejectWithValue(message);
      }
      return thunkAPI.rejectWithValue('Unexpected error');
    }
  }
);

export const logoutUser = createAsyncThunk<
  void,
  void,
  { rejectValue: string }
>(
  'auth/logout',
  async (_, thunkAPI) => {
    try {
      await axiosInstance.post('/auth/logout');
    } catch (err: unknown) {
      if (axios.isAxiosError(err)) {
        const message = err.response?.data?.message || 'Logout failed';
        return thunkAPI.rejectWithValue(message);
      }
      return thunkAPI.rejectWithValue('Unexpected error');
    }
  }
);