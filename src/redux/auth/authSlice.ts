import { createSlice } from '@reduxjs/toolkit';
import { AuthTypes } from './authTypes';
import { loginUser, logoutUser } from './authThunks';

const initialState: AuthTypes = {
    isAuthenticated: false,
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
      setAuthenticated(state) {
        state.isAuthenticated = true;
      },
      setUnauthenticated(state) {
        state.isAuthenticated = false;
      },
    },
    extraReducers: (builder) => {
      builder
        .addCase(loginUser.fulfilled, (state) => {
          state.isAuthenticated = true;
        })
        .addCase(loginUser.rejected, (state) => {
          state.isAuthenticated = false;
        })
        .addCase(logoutUser.fulfilled, (state) => {
          state.isAuthenticated = false;
        })
        .addCase(logoutUser.rejected, (state) => {
          state.isAuthenticated = true;
        });
    },
  });
  
export const { setAuthenticated, setUnauthenticated } = authSlice.actions;
export default authSlice.reducer;