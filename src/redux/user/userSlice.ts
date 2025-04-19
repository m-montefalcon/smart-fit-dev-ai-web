// src/redux/user/userSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { UserInfo } from './userTypes';

const initialState: UserInfo = {
  id: '',
  fullName: '',
  email: '',
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUserInfo(state, action: PayloadAction<UserInfo>) {
      state.id = action.payload.id;
      state.fullName = action.payload.fullName;
      state.email = action.payload.email;
    },
    clearUserInfo(state) {
      state.id = '';
      state.fullName = '';
      state.email = '';
    },
  },
});

export const { setUserInfo, clearUserInfo } = userSlice.actions;
export default userSlice.reducer;
