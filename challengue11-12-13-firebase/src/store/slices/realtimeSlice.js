import { createSlice } from '@reduxjs/toolkit';

const realtimeSlice = createSlice({
  name: 'realtime',
  initialState: { messages: [] },
  reducers: {
    setMessages: (s,{payload}) => { s.messages = payload; },
  }
});

export const { setMessages } = realtimeSlice.actions;
export default realtimeSlice.reducer;