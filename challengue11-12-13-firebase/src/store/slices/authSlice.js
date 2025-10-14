import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  status: 'idle', // 'idle' | 'checking' | 'authenticated' | 'not-authenticated'
  uid: null,
  email: null,
  displayName: null,
  errorMessage: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    checkingCredentials: (state) => { state.status = 'checking'; state.errorMessage = null; },
    login: (state, { payload }) => {
      state.status = 'authenticated';
      state.uid = payload.uid;
      state.email = payload.email;
      state.displayName = payload.displayName ?? null;
      state.errorMessage = null;
    },
    logout: (state, { payload }) => {
      state.status = 'not-authenticated';
      state.uid = null; state.email = null; state.displayName = null;
      state.errorMessage = payload ?? null;
    },
  },
});

export const { checkingCredentials, login, logout } = authSlice.actions;
export default authSlice.reducer;
