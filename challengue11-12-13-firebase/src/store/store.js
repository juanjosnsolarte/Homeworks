import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import firestoreReducer from './slices/firestoreSlice';
import realtimeReducer from './slices/realtimeSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    firestore: firestoreReducer,
    realtime: realtimeReducer,
  },
});
