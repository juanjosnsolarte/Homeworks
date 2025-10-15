import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  status: 'checking', // 'checking' | 'authenticated' | 'not-authenticated'
  uid: null,
  email: null,
  displayName: null,
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login: (state, { payload }) => {
      state.status = 'authenticated'
      state.uid = payload.uid
      state.email = payload.email
      state.displayName = payload.displayName || null
    },
    logout: (state) => {
      state.status = 'not-authenticated'
      state.uid = null
      state.email = null
      state.displayName = null
    },
    setChecking: (state, { payload }) => {
      state.status = payload ? 'checking' : state.status
    },
  },
})

export const { login, logout, setChecking } = authSlice.actions
export default authSlice.reducer
