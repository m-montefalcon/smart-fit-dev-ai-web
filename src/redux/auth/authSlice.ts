import { createSlice } from '@reduxjs/toolkit';
import { AuthTypes } from './authTypes';
  
const initialState: AuthTypes = {
    isAuthenticated: false,
    isLoading: false,
    error: null,
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
  });
  
export const { setAuthenticated, setUnauthenticated } = authSlice.actions;
export default authSlice.reducer;