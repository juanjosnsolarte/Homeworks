import { configureStore } from '@reduxjs/toolkit';
import counterReducer from './slices/counterSlice.js';
import stackReducer from './slices/stackSlice.js';

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    stack: stackReducer,
  },
});
